## 前提
用于NEI项目中，项目中应有NEI生成的mock文件夹

请全局安装, 在mock文件夹的父文件夹下使用，一般为webapp下

## 开始
- `neimockpatch init` ： 得到mock规则x_rules.json
- `neimockpatch mock` ： 根据mock规则mock数据
- `neimockpatch reset`： mock数据重置为nei的数据

## 特征
可以融合`nei update`后的新接口和已有接口的自定义mock规则（不完善）

## 未完成
检测mock规则的变化，自动更新mock数据
