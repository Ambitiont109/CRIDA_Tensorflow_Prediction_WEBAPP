from django.http import HttpResponse
import pandas as pd
import numpy as np
import datetime
import json
import io
import csv
# used to export a trained model
from sklearn.externals import joblib
from keras.models import load_model
from numpy import newaxis
from django.views.decorators.csrf import csrf_exempt


def toDateTime(dt, format):
    return datetime.datetime.strptime(dt, format)


def isLowCost(airline):
    low_cost = ['VLG', 'RYR']
    if airline in low_cost:
        return 1
    else:
        return 0


def flightHaul(distance):
    if (distance < 1207.01):
        return "Short Haul"
    elif (distance < 4023.36):
        return "Medium Haul"
    elif (distance < 9656.064):
        return "Long Haul"
    else:
        return "Ultra Long Haul"


def single_predict_endpoint(request):

    pd.options.mode.chained_assignment = None

    # Load a model
    model = joblib.load(
        'crida_backend/trained_models/single_flight/xgb_base_model_new.pkl')

    # Load encoders
    label_encoder_airline = joblib.load(
        'crida_backend/encoders/single_flight/labelencoder_airline.pkl')
    label_encoder_month = joblib.load(
        'crida_backend/encoders/single_flight/labelencoder_month.pkl')
    label_encoder_weekday = joblib.load(
        'crida_backend/encoders/single_flight/labelencoder_weekday.pkl')
    label_encoder_wake = joblib.load(
        'crida_backend/encoders/single_flight/labelencoder_wake.pkl')

    # Read input variables
    airportDepDelay = float(request.GET.get('airportDepDelay'))
    arrivalDelay = float(request.GET.get('arrivalDelay'))
    schedTurnd = int(request.GET.get('schedTurnd'))*60
    plannedDep = request.GET.get('plannedDep')
    asma40 = float(request.GET.get('asma40'))
    asma60 = float(request.GET.get('asma60'))
    holdingTime = float(request.GET.get('holdingTime'))
    temperature = float(request.GET.get('temperature'))
    visibility = float(request.GET.get('visibility'))
    windIntensity = float(request.GET.get('windIntensity'))
    wake = request.GET.get('wake')
    distanceOrigin = float(request.GET.get('distanceOrigin'))
    distanceTarget = float(request.GET.get('distanceTarget'))
    depAirlineICAO = request.GET.get('arrAirlineICAO')

    # Retrieve month, weekday, day, hour and day part from "plannedDep"
    dt = datetime.datetime.strptime(plannedDep, "%Y-%m-%dT%H:%M")
    month = dt.month
    day = dt.day
    hour = dt.hour
    weekday = dt.weekday()

    data = {'AIRPORT_DEP_DELAY_LAST2HOURS': [airportDepDelay],
            'ARRIVAL_DELAY_MIN': [arrivalDelay],
            'PLANNED_TURNAROUND_SEC': [schedTurnd],
            'PLANNED_DEP_HOUR': [hour],
            'ADDITIONAL_ASMA_40': [asma40],
            'ADDITIONAL_ASMA_60': [asma60],
            'HOLDING_SEC': [holdingTime],
            'TEMPERATURE': [temperature],
            'VISIBILITY': [visibility],
            'WIND_INTENSITY': [windIntensity],
            'WAKE': [wake],
            'DISTANCE_FROM_ORIGIN': [distanceOrigin],
            'DISTANCE_TO_TARGET': [distanceTarget],
            'MONTH': [month],
            'WEEKDAY': [weekday],
            'DEP_AIRLINE': [depAirlineICAO]
            }
    X = pd.DataFrame(data)

    X["IS_LOWCOST"] = X["DEP_AIRLINE"].apply(lambda x: isLowCost(x))

    continuous_features = ['AIRPORT_DEP_DELAY_LAST2HOURS', 'ARRIVAL_DELAY_MIN', 'PLANNED_TURNAROUND_SEC', 'DISTANCE_TO_TARGET',
                           'PLANNED_DEP_HOUR', 'ADDITIONAL_ASMA_40', 'ADDITIONAL_ASMA_60', 'HOLDING_SEC', 'WIND_INTENSITY', 'VISIBILITY', 'TEMPERATURE', 'IS_LOWCOST']

    categorical_features = ['DEP_AIRLINE', 'WAKE', 'WEEKDAY', 'MONTH']

    dataset = X[continuous_features]

    dataset["DEP_AIRLINE"] = label_encoder_airline.transform(X['DEP_AIRLINE'])
    dataset["WAKE"] = label_encoder_wake.transform(X['WAKE'])
    dataset["WEEKDAY"] = label_encoder_weekday.transform(X['WEEKDAY'])
    dataset["MONTH"] = label_encoder_month.transform(X['MONTH'])

    dataset = pd.DataFrame(dataset)

    #dataset = pd.concat([X_continuous, X_categorical], axis=1)

    # Execute the model to get predictions (predict_proba)
    selected_features = ['AIRPORT_DEP_DELAY_LAST2HOURS', 'ARRIVAL_DELAY_MIN', 'PLANNED_TURNAROUND_SEC', 'DISTANCE_TO_TARGET', 'PLANNED_DEP_HOUR', 'ADDITIONAL_ASMA_40',
                         'ADDITIONAL_ASMA_60', 'HOLDING_SEC', 'WIND_INTENSITY', 'VISIBILITY', 'TEMPERATURE', 'IS_LOWCOST', 'DEP_AIRLINE', 'WAKE', 'WEEKDAY', 'MONTH']

    y = model.predict_proba(dataset[selected_features].as_matrix())
    y_pred = int(np.argmax(y[0]))
    y_prob = round(float(np.max(y[0])), 2)

    response_data = {}
    response_data['prediction'] = y_pred
    response_data['probability'] = y_prob
    response_json = json.dumps(response_data)

    return HttpResponse(response_json)


# This end-point is used to predict arrivals and departures
# delay category for the batch of flights
@csrf_exempt
def batch_predict_endpoint(request):

    pd.options.mode.chained_assignment = None

    # Load models
    lstm_arr = load_model(
        'crida_backend/trained_models/batch_flights/keras_ltsm_arr_model.hdf5')
    lstm_dep = load_model(
        'crida_backend/trained_models/batch_flights/keras_ltsm_dep_model.hdf5')

    # Load encoders
    min_max_enc_arr = joblib.load(
        'crida_backend/encoders/batch_flights/arr_encoders/minmaxscaler.pkl')
    one_hot_enc_arr = joblib.load(
        'crida_backend/encoders/batch_flights/arr_encoders/onehotencoder.pkl')
    min_max_enc_dep = joblib.load(
        'crida_backend/encoders/batch_flights/dep_encoders/minmaxscaler.pkl')
    one_hot_enc_dep = joblib.load(
        'crida_backend/encoders/batch_flights/dep_encoders/onehotencoder.pkl')
    one_hot_enc_arr.handle_unknown = 'ignore'
    one_hot_enc_dep.handle_unknown = 'ignore'

    continuous_features = ["HOLDING_SEC", "ADDITIONAL_ASMA_40", "ADDITIONAL_ASMA_60",
                           "PLANNED_TURNAROUND_SEC", "AIRPORT_DEP_DELAY_LAST2HOURS",
                           "TEMPERATURE", "VISIBILITY", "WIND_INTENSITY",
                           "DISTANCE"]
    categorical_features = ["MONTH", "WEEKDAY", "PLANNED_HOUR", "WAKE", "FLIGHT_HAUL",
                            "WIND_DIRECTION", "IS_LOWCOST", "TYPE"
                            ]

    # Read static variables

    '''
    sample_data = request.POST['csvData']

    print("sample_data",sample_data)
    '''

    '''
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)
    '''

    body_unicode = request.body.decode('utf-8')

    body = json.loads(body_unicode)
    print("==================")
    print(body['csvData'])
    if body['csvData']:
        # print("body_unicode",body_unicode)

        #holdingTime = float(body['holdingTime'])
        #asma40 = float(body['asma40'])
        #asma60 = float(body['asma60'])
        temperature = float(body['temperature'])
        visibility = float(body['visibility'])
        windIntensity = float(body['windIntensity'])
        windDirection = body['windDirection']
        airportDepDelay = float(body['airportDepDelay'])

        #holdingTime = float(request.GET.get('holdingTime'))

        # print("content",holdingTime)

        '''
        holdingTime = float(request.GET.get('holdingTime'))
        asma40 = float(request.GET.get('asma40'))
        asma60 = float(request.GET.get('asma60'))
        temperature = float(request.GET.get('temperature'))
        visibility = float(request.GET.get('visibility'))
        windIntensity = float(request.GET.get('windIntensity'))
        windDirection = request.GET.get('windDirection')
        airportDepDelay = float(request.GET.get('airportDepDelay'))

        print("holdingTime",holdingTime)
        '''

        dct = {
            # 'HOLDING_SEC': holdingTime,
            # 'ADDITIONAL_ASMA_40': asma40,
            # 'ADDITIONAL_ASMA_60': asma60,
            'TEMPERATURE': temperature,
            'VISIBILITY': visibility,
            'WIND_INTENSITY': windIntensity,
            'WIND_DIRECTION': windDirection,
            'AIRPORT_DEP_DELAY_LAST2HOURS': airportDepDelay
        }
        # validate the csv data
        f = io.StringIO(body['csvData'])
        reader = csv.reader(f, delimiter=',')
        index = 0
        header_cnt = 0
        for row in reader:
            print(index, len(row))
            if index == 0:
                header_cnt = len(row)
            elif len(row) != header_cnt:
                response_json = json.dumps({"status": False,
                                            "error_msg": "The number of columns in CSV file is wrong"})
                return HttpResponse(response_json, status=417)
            index = index + 1

        # Read dynamic variables from CSV data
        csvData = pd.DataFrame([x.split(',')
                                for x in str(body['csvData']).split('\n')])

        csvData.columns = csvData.iloc[0]
        csvData = csvData.reindex(csvData.index.drop(0))
        X = csvData[:-1]
        print(X.columns)
        print(X.head)
        X.columns = [c.replace('\r', '') for c in X.columns]

        X["AIRLINE_ICAO"] = X["AIRLINE_ICAO"].astype(str)
        X["WAKE"] = X["WAKE"].astype(str)
        X["DATETIME"] = X["DATETIME"].astype(str)
        X["PLANNED_TURNAROUND"] = X["PLANNED_TURNAROUND"].astype(
            str).astype(float)
        print(X["DISTANCE"])
        print(X.dtypes)
        X["DISTANCE"] = X["DISTANCE"].astype(str).astype(float)

        X = X.rename(columns={'HOLDING': 'HOLDING_SEC',
                              'ASMA40': 'ADDITIONAL_ASMA_40', 'ASMA60': 'ADDITIONAL_ASMA_60'})

        '''
        new = []
        for i in range(0,len(arr)):
            line = arr[i].split(",")
            new.append(line)

        X = pd.DataFrame(new[1:],columns=new[0])

        print("X",X.head())
        '''

        '''
        csvData = {
                "NUM":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                "AIRLINE_ARR_ICAO":["VLG","VLG","VLG","VLG","VLG","VLG","VLG","VLG","VLG","VLG","VLG","VLG","VLG","VLG","VLG","VLG","VLG","VLG","VLG","VLG"],
                "WAKE":["M","H","M","H","M","H","M","H","M","H","M","H","M","H","M","H","M","H","M","H"],
                "SIBT":["2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00","2016-01-01 04:05:00"],
                "SOBT":["2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00","2016-01-01 14:10:00"],
                "PLANNED_TURNAROUND":[45,55,45,55,45,55,45,55,45,55,45,55,45,55,45,55,45,55,45,55],
                "DISTANCE_FROM_ORIGIN":[780,500,780,500,780,500,780,500,780,500,780,500,780,500,780,500,780,500,780,500],
                "DISTANCE_TO_TARGET":[780,500,780,500,780,500,780,500,780,500,780,500,780,500,780,500,780,500,780,500]
        }
        '''

        '''
        csvData = {
                "NUM":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                "AIRLINE_ARR_ICAO":["AEA","AEA","AVA","IBE","IBE","IBE","IBE","IBE","ANE","ETD","IBS","IBE","IBE","IBE","QTR","IBS","IBS","ELY","AAL","TVF"],
                "WAKE":["H","H","H","H","H","H","H","H","M","H","M","H","H","H","H","M","M","M","H","M"],
                "SIBT":["2016-01-01 04:05:00","2016-01-01 04:25:00","2016-01-01 05:05:00","2016-01-01 05:20:00","2016-01-01 05:25:00","2016-01-01 05:30:00","2016-01-01 05:30:00","2016-01-01 05:40:00","2016-01-01 05:50:00","2016-01-01 06:35:00","2016-01-01 06:50:00","2016-01-01 06:50:00","2016-01-01 06:50:00","2016-01-01 06:50:00","2016-01-01 06:55:00","2016-01-01 07:00:00","2016-01-01 07:00:00","2016-01-01 07:05:00","2016-01-01 07:05:00","2016-01-01 07:30:00"],
                "SOBT":["2016-01-01 14:10:00","2016-01-01 06:30:00","2016-01-01 07:05:00","2016-01-01 10:40:00","2016-01-01 10:50:00","2016-01-01 08:10:00","2016-01-01 11:00:00","2016-01-01 11:35:00","2016-01-01 14:50:00","2016-01-01 08:00:00","2016-01-01 08:00:00","2016-01-01 10:35:00","2016-01-01 10:50:00","2016-01-01 10:55:00","2016-01-01 08:30:00","2016-01-01 07:45:00","2016-01-01 07:45:00","2016-01-01 08:30:00","2016-01-01 12:05:00","2016-01-01 08:10:00"],
                "PLANNED_TURNAROUND":[605,125,120,320,325,160,330,355,540,85,70,225,240,245,95,45,45,85,300,40],
                "DISTANCE_FROM_ORIGIN":[9920.67,10060.80,8033.86,6000.00,6698.42,10699.06,9081.35,5776.89,284.73,5647.10,547.36,6763.16,7120.40,7010.08,5338.52,485.52,394.98,3550.48,5925.61,1030.31],
                "DISTANCE_TO_TARGET":[5776.89,483.93,8033.86,8507.73,6698.42,1246.30,8033.86,8749.87,284.73,5647.10,1460.92,6763.16,7120.40,6000.00,5338.52,1721.09,429.37,3550.48,5925.61,1030.31]
        }

        X = pd.DataFrame(csvData)
        '''

        X = X.assign(**dct)

        X['IS_LOWCOST'] = X['AIRLINE_ICAO'].apply(lambda x: isLowCost(x))

        try:
            X['MONTH'] = X['DATETIME'].apply(
                lambda x: toDateTime(x, "%Y-%m-%d %H:%M:%S").month)
            X['WEEKDAY'] = X['DATETIME'].apply(
                lambda x: toDateTime(x, "%Y-%m-%d %H:%M:%S").weekday())
            X['PLANNED_HOUR'] = X['DATETIME'].apply(
                lambda x: toDateTime(x, "%Y-%m-%d %H:%M:%S").hour)
        except ValueError:
            try:
                X['MONTH'] = X['DATETIME'].apply(
                    lambda x: toDateTime(x, "%d-%m-%Y %H:%M:%S").month)
                X['WEEKDAY'] = X['DATETIME'].apply(
                    lambda x: toDateTime(x, "%d-%m-%Y %H:%M:%S").weekday())
                X['PLANNED_HOUR'] = X['DATETIME'].apply(
                    lambda x: toDateTime(x, "%d-%m-%Y %H:%M:%S").hour)
            except ValueError:
                response_json = json.dumps({"success": False,
                                            "error_msg": "Datetime format is incorrect"})
                return HttpResponse(response_json, status=417)

        X['PLANNED_TURNAROUND_SEC'] = X['PLANNED_TURNAROUND'].apply(
            lambda x: x*60)
        X['FLIGHT_HAUL'] = X['DISTANCE'].apply(lambda x: flightHaul(x))

        to_remove = [
            0,
            "NUM",
            "PLANNED_TURNAROUND",
            "DATETIME",
            "AIRLINE_ICAO"
        ]

        X = X[X.columns.difference(to_remove)]

        X_continuous = pd.DataFrame(min_max_enc_arr.fit_transform(
            X[continuous_features]), columns=continuous_features)
        X_categorical = pd.DataFrame(
            one_hot_enc_arr.transform(X[categorical_features]).toarray())
        X_enc_arr = pd.concat([X_continuous, X_categorical], axis=1)
        X_enc_arr = np.array(X_enc_arr)[np.newaxis, :, :]

        X_continuous = pd.DataFrame(min_max_enc_dep.fit_transform(
            X[continuous_features]), columns=continuous_features)
        X_categorical = pd.DataFrame(
            one_hot_enc_dep.transform(X[categorical_features]).toarray())
        X_enc_dep = pd.concat([X_continuous, X_categorical], axis=1)
        X_enc_dep = np.array(X_enc_dep)[np.newaxis, :, :]

        response_data = {}
        response_data['prediction_arr'] = int(
            lstm_arr.predict_classes(X_enc_arr)[0])
        response_data['prediction_dep'] = int(
            lstm_dep.predict_classes(X_enc_dep)[0])
        response_data['probability_arr'] = round(
            float(np.max(lstm_arr.predict(X_enc_arr))), 3)
        response_data['probability_dep'] = round(
            float(np.max(lstm_dep.predict(X_enc_dep))), 3)
        response_data['success'] = True
        response_json = json.dumps(response_data)

        print("lstm_arr.predict_classes(X_enc_arr)[0]", int(
            lstm_arr.predict_classes(X_enc_arr)[0]))
        print("lstm_arr.predict_classes(X_enc_dep)[0]", int(
            lstm_dep.predict_classes(X_enc_dep)[0]))
        print("lstm_arr.predict(X_enc_arr)", round(
            float(np.max(lstm_arr.predict(X_enc_arr))), 3))
        print("lstm_arr.predict(X_enc_dep)", round(
            float(np.max(lstm_dep.predict(X_enc_dep))), 3))

        return HttpResponse(response_json)

    else:

        print("Empty request body")
        response_data = {}
        response_data['prediction_arr'] = 0
        response_data['prediction_dep'] = 0
        response_data['probability_arr'] = 0
        response_data['probability_dep'] = 0
        response_data['success'] = True
        response_json = json.dumps(response_data)
        return HttpResponse(response_json)
