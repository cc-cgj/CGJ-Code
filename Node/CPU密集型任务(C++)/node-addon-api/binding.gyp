{
  "targets":[
    {
      "target_name":"screen",
      "sources":["index.cpp"],
      # 引入node-addon-api的头文件
      "include_dirs": ["<!@(node -p \"require('node-addon-api').include\")"]
    }
  ]
}