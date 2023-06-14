import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import GroupKFold, TimeSeriesSplit, LeaveOneGroupOut, LeavePGroupsOut, \
    cross_val_score  # , cross_val_score
from lightgbm import LGBMClassifier
from sklearn.metrics import confusion_matrix, classification_report, roc_auc_score, roc_curve
# from sklearn.dummy import DummyClassifier
from sklearn.model_selection import RandomizedSearchCV
from sklearn.metrics import *

np.random.seed(0)

df = pd.read_csv('data.csv')

# drop mapName column
df = df.drop('mapName', axis=1)


df['nextWinningSide'] = df.groupby('matchID')['winningSide'].shift(-1).astype('Int64')
df['defuseKit'] = df['defuseKit'].astype('int')
df = df.drop('roundEndReason', axis=1)
# convert inf to nan
df = df.replace([np.inf, -np.inf], np.nan)
df = df.dropna()

for col in df.columns:
    if df[col].dtype == 'int64':
        df[col] = df[col].astype('int8')
    if df[col].dtype == 'int32':
        df[col] = df[col].astype('int8')
    if df[col].dtype == 'float64':
        df[col] = df[col].astype('float16')

model = LGBMClassifier(random_state=0)

X = df.drop(['nextWinningSide', 'matchID'], axis=1)

X = X[['winningSide', 'ctStart', 'tStart', 'ctEnd', 'site', 'ctUtility', 'tUtility', 'defuseKit', 'ctHelmet', 'tHelmet', 'timeLeft', 'totalEliminated', 'PC1', 'halfTime']]

y = df['nextWinningSide']
groups = df['matchID']

y = y.astype('int')

cv = GroupKFold(n_splits=3)

param_dist = {
    'n_estimators': [1,2,4,8,16],
    'max_depth': [2,3,4,5,6],
    'num_leaves': [4,8,16,32,64],
    'learning_rate': [2, 1, 0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625, 0.0078125, 0.00390625, 0.001953125, 0.0009765625, 0.00048828125, 0.000244140625, 0.0001220703125, 0.00006103515625],
    'linear_tree': [False],
    'max_bin': [3,7,15,31,63,127],
}

random_search = RandomizedSearchCV(model, param_distributions=param_dist, n_iter=40000, cv=cv, scoring='roc_auc', random_state=0, n_jobs=-1)
random_search.fit(X, y, groups=groups)

def report(results, n_top=500):
    for i in range(1, n_top + 1):
        candidates = np.flatnonzero(results['rank_test_score'] == i)
        for candidate in candidates:
            print('Rank: {0}'.format(i))
            print('Mean validation score: {0:.6f} (std: {1:.6f})'.format(
                results['mean_test_score'][candidate],
                results['std_test_score'][candidate]))
            print('Parameters: {0}'.format(results['params'][candidate]))
            print('')
report(random_search.cv_results_)
