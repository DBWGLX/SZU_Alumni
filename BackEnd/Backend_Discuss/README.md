#### 该文件源自 樊顺琪，有任何问题请联系个人修改

# 配置
1. 需要jdk1.8，构建配置使用Maven，依赖都在pom.xml中。使用idea可以自动下载配置。

2. 运行数据库为MySQL,配置文件位于 `src/main/resources/application.properties`.运行时请将其修改为你自己的MySQL配置

3. 运行数据库前请确认已经存在表 `posts`,需要字段如下
 `id:主键，bigint类型`
 
 `title:文章标题，char(100)`
 
 `date:文章发布日期，datetime`
 
 `u_id:发布者id（是另外一个数据库的主键），bigint`
 
4. 程序启动时使用默认端口8080，请确认无冲突。启动时运行`src\main\java\org.example\Main`即可

    

***

# 接口API

### 获取帖子列表

请求路径：`/discuss/list`

请求方式：`get`

接口描述：**用于获取帖子列表**

#### 1.请求参数

`begin`: `从第几个开始` 

`number`: `要几个`

`id`: `用户id`	

`time`: `当前时间戳`

#### 2.返回数据

`disId`: `帖子id` 

`disName`: `发帖人姓名`

`disPic`: `发帖人头像(base64编码)`,

`disContent`: `发帖内容`

#### 3.备注

通过**数组**形式返回,返回的帖子与用户无关，按照时间从最新到最老排序

$disContent$内容如下$JSON$格式

`title`：`文章标题（String）`

`image`：`文章首页照片（base64编码)`

`Date`:`文章发布日期`

***

### 获取帖子正文

请求路径`/discuss/list/text`

请求方式：`get`

接口描述：**获取具体的帖子正文内容**

#### 1.参数列表

`time`:`时间戳`

`id`:`帖子id`

#### 2.返回数据

`text`: `正文`

`user_id` ：`发帖者id`

`Date` ：`发帖日期`

`title`：`帖子标题`

`images`:`图片base64编码的JSON数组,每一个元素内容为"imageData":"图片的base64编码" .`

***



### 用户查询自己发布的帖子记录

请求路径 `/discuss/list/byuser`

请求方式：`get`

接口描述：**查询某一特定用户发布的帖子，默认按照时间最新到最老**

#### 1.请求参数

`id`:`用户id`

`time`:`时间戳`

#### 2.返回数据格式

`disId`: `帖子id`

`disContent`: `发帖内容`

**备注**

通过数组形式返回，按照时间从最新到最老排序

disContent内容如下JSON格式

`title`：`文章标题（String）`

`image`：`文章首页照片（base64编码）`

`Date`:`文章发布日期`

***



### 发布帖子

请求路径：`/discuss/list`

请求方式：`post`

接口描述：**用于获取帖子列表**



#### 1.请求参数

`id`: `用户id`

`time`: `当前时间戳`

`detailTop`:`发帖标题`

`detailAll`: `发帖内容正文`

`dePic`:`发帖照片（base64编码的数组）`

#### 2.返回数据

`success`: `true`,

`discus`:`帖子Id`

**备注**

发帖照片存储为数组形式返回，之前为一个照片，最多为9个照片

标题长度最多为30个字

***

### 删除帖子

请求路径：`/discuss/list`

请求方式：`delete`

接口描述：**用于删除帖子(已实现)以及帖子中的所有评论（未实现评论功能，等二次迭代）**



#### 1.请求参数

`id`: `用户id`

`time`: `当前时间戳`

`disId`: `帖子id`

#### 2.返回数据

`success`: `true`

***

# 测试

   简单的测试样例在`test.py`中。注意$base64$编码有格式要求，随意填写可能会出现转换后的数据与原始数据不同。另外为了方便测试，本人已经关闭了部分查询优化，使得插入结果能够实时更新。如果需要测试高并发场景请联系作者开启优化。

  本程序运行时会在控制台输出一些调试信息，如果使用中出现问题，请截图后询问作者，如果不需要调试信息，觉得降低性能，可以注释掉文件中所有的$System.out$开头的函数调用。

  本程序的使用需要联动另外的用户登录那边的数据查询接口。如果你没有开启用户登录注册服务，那么查询时将不会在结果中出现发帖者信息相关的字段，本程序依然能够正常运行。具体字段请查看**获取帖子列表**。

  

***

# 文件储存设计

运行时产生的帖子信息储存在数据库中，帖子的正文储存在项目根目录下的`discuss`目录下。一个帖子有两个文件一个是`id`+`_text.json`,储存帖子的标题，正文，图片，日期等信息。具体可以进行插入之后查看。另外一个文件是`id`，是该文件存储图片的首页照片信息，由于不清楚格式，所以没有后缀，如果你知道图片格式，更改后缀为对应格式即可查看。