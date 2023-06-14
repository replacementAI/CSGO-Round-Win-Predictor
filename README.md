# CSGO-Round-Win-Predictor
Project that tells you who will win the next round of CSGO given previous round info

https://www.aimand.click/

## Technical Info
Model used: Gradient Boosted Decision Tree (GBDT) (from LightGBM library)

Params = {'n_estimators': [8],'max_depth': [4],'num_leaves': [8],'learning_rate': [0.125],'max_bin': [3],}

CV Method: GroupKFold (grouped by match)
