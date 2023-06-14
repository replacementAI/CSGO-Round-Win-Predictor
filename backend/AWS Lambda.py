import numpy as np
import sklearn
import scipy
import json
import math
import json
from sklearn.externals import joblib
import lightgbm
from lightgbm import LGBMClassifier

def lambda_handler(event, context):
    winningSide = event['queryStringParameters']['winningSide']
    ctStart = event['queryStringParameters']['ctStart']
    tStart = event['queryStringParameters']['tStart']
    ctEnd = event['queryStringParameters']['ctEnd']
    site = event['queryStringParameters']['site']
    ctUtility = event['queryStringParameters']['ctUtility']
    tUtility = event['queryStringParameters']['tUtility']
    defuseKit = event['queryStringParameters']['defuseKit']
    ctHelmet = event['queryStringParameters']['ctHelmet']
    tHelmet = event['queryStringParameters']['tHelmet']
    timeLeft = event['queryStringParameters']['timeLeft']
    totalEliminated = event['queryStringParameters']['totalEliminated']
    PC1 = event['queryStringParameters']['PC1']
    halfTime = event['queryStringParameters']['halfTime']

    # preprocessed_input = preprocess(input_data)
    
    winningSide = int(winningSide)
    ctStart = int(ctStart)
    tStart = int(tStart)
    ctEnd = int(ctEnd)
    site = int(site)
    ctUtility = int(ctUtility)
    tUtility = int(tUtility)
    defuseKit = int(defuseKit)
    ctHelmet = int(ctHelmet)
    tHelmet = int(tHelmet)
    timeLeft = int(timeLeft)
    totalEliminated = int(totalEliminated)
    PC1 = int(PC1)
    halfTime = int(halfTime)
    
    X = np.array([winningSide,ctStart,tStart,ctEnd,site,ctUtility,tUtility,defuseKit,ctHelmet,tHelmet,timeLeft,totalEliminated,PC1,halfTime])
    
    model = joblib.load('model.pkl')
    
    return {'statusCode': 200,'body': json.dumps(model.predict_proba(X))}
