## 前提

用于NEI项目中，项目中应有NEI生成的mock文件夹

## 开始
 - 运行 `neimockpatch init` 得到初始规则mock的数据
 - 在对应接口的 **x_rules.json**文件中自定义mock规则后，运行`neimockpatch mock`
 - 运行 `neimockpatch reset`，返回到nei的数据

## 特征
  - 智能融合`nei update`后的新数据 和 已有的自定义mock规则