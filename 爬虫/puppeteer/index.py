import sys
import jieba #分词
from wordcloud import WordCloud #生成词云
from matplotlib import pyplot as plt #创建图片

text = sys.argv[1] #获取nodejs 传过来的值

worldText = jieba.cut(text) #分词
text = " ".join(worldText) #转换为字符串

# font_path 字体文件 因为这个东西是不支持中文，需要一个中文的字体文件，才能展示出来中文
font_path = './NotoSansSC-VariableFont_wght.ttf'
wordCould = WordCloud(font_path=font_path,background_color="white",width=1000,height=800).generate(text)

plt.imshow(wordCould) # 显示图片
plt.axis("off") #关闭坐标轴
plt.show() #显示
