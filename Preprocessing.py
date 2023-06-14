import os
import numpy as np
import pandas as pd
import seaborn as sns
# from awpy import DemoParser
from matplotlib import pyplot as plt
from joblib import Parallel, delayed
import multiprocessing
from awpy import *


dataframe = pd.DataFrame(columns=[
    'roundEndReason',
    'winningSide',
    'ctStart',
    'tStart',
    'ctEnd',
    'tEnd',
    'ctEliminated',
    'tEliminated',
    'site',
    'ctUtility',
    'tUtility',
    'matchID',
])

demos = 'demos'

for file in os.listdir(demos):
    demo_parser = DemoParser(demofile=os.path.join(demos, file))
    data = demo_parser.parse()

    for i in range(len(data["gameRounds"])):
        dataframe = dataframe.append({
            'roundEndReason': data["gameRounds"][i]["roundEndReason"],
            'winningSide': 1 if data["gameRounds"][i]["winningSide"] == "CT" else 0,
            'ctStart': data["gameRounds"][i]["frames"][0]["ct"]["alivePlayers"],
            'tStart': data["gameRounds"][i]["frames"][0]["t"]["alivePlayers"],
            'ctEnd': data["gameRounds"][i]["frames"][-1]["ct"]["alivePlayers"],
            'tEnd': data["gameRounds"][i]["frames"][-1]["t"]["alivePlayers"],
            'site': data["gameRounds"][i]["frames"][-1]["bombsite"],
            'ctUtility': data["gameRounds"][i]["frames"][0]["ct"]["totalUtility"],
            'tUtility': data["gameRounds"][i]["frames"][0]["t"]["totalUtility"],
            'defuseKit': 1 if any(player["hasDefuse"] for player in data["gameRounds"][i]["frames"][0]["ct"]["players"]) else 0,
            'ctHelmet': 1 if any(player["hasHelmet"] for player in data["gameRounds"][i]["frames"][0]["ct"]["players"]) else 0,
            'tHelmet': 1 if any(player["hasHelmet"] for player in data["gameRounds"][i]["frames"][0]["t"]["players"]) else 0,
            'matchID': data["matchID"],
            'timeLeft': data["gameRounds"][i]["frames"][-1]["clockTime"],
            'startTick': data["gameRounds"][i]["startTick"],
            'halfTick': 0 if len(data["matchPhases"]["gameHalfEnded"]) == 0 else data["matchPhases"]["gameHalfEnded"][0],
            'mapName': data["mapName"],
        }, ignore_index=True)

        # print matchID
        print(data["matchID"])

dataframe["ctEliminated"] = dataframe["ctStart"] - dataframe["ctEnd"]
dataframe["tEliminated"] = dataframe["tStart"] - dataframe["tEnd"]
dataframe["totalEliminated"] = dataframe["ctEliminated"] + dataframe["tEliminated"]

dataframe["PC1"] = dataframe["ctEnd"] - dataframe["tEnd"]
dataframe["PC2"] = dataframe["ctEnd"] + dataframe["tEnd"]

# binarize utility
dataframe["ctUtility"] = dataframe["ctUtility"].apply(lambda x: 1 if x > 0 else 0)
dataframe["tUtility"] = dataframe["tUtility"].apply(lambda x: 1 if x > 0 else 0)

# if site is empty, set to 0
dataframe["site"] = dataframe["site"].apply(lambda x: 0 if x == "" else x)

# if site is A, set to 1
dataframe["site"] = dataframe["site"].apply(lambda x: 1 if x == "A" else x)

# if site is B, set to 2
dataframe["site"] = dataframe["site"].apply(lambda x: 2 if x == "B" else x)

# convert timeLeft from str to int MM:SS
dataframe["timeLeft"] = dataframe["timeLeft"].apply(lambda x: int(x.split(":")[0]) * 60 + int(x.split(":")[1]))

# convert object startTick to int
dataframe["startTick"] = dataframe["startTick"].astype(int)

dataframe['halfTime'] = np.where(dataframe['startTick'] > dataframe['halfTick'], 1, 0)
dataframe = dataframe.drop(columns=['startTick', 'halfTick'])

# set matchID to index
dataframe.set_index('matchID', inplace=True)

# export to csv
dataframe.to_csv('data.csv')
