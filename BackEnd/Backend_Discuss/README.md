#### 该文件源自 樊顺琪，有任何问题请联系个人修改

# 配置
1. 需要jdk1.8，构建配置使用Maven，依赖都在pom.xml中。使用idea可以自动下载配置。

2. 运行数据库为MySQL,配置文件位于 `src/main/resources/application.properties`.运行时请将其修改为你自己的MySQL配置

3. 运行数据库

```sql
//数据库创建表语句
create table posts
(
    id    bigint auto_increment
        primary key,
    title char(100) not null,
    date  datetime  not null,
    u_id  bigint    not null,
    visits int      not null,
    subtext char(100) not null
);

create table Comments
(
    id   BIGINT auto_increment,
    u_id BIGINT not null,
    p_id BIGINT not null,
    time datetime not null,
    constraint Comments_pk
        primary key (id)
);

```



4. 程序启动时使用默认端口8080，请确认无冲突。启动时运行`src\main\java\org.example\Main`即可

5. 该程序运行需要用户数据库那边配合，当然你不启动另外一边的服务也能够运行。只是拿不到用户相关的头像，昵称等数据。

6. 注意get请求方式的参数都是在请求头中传输。post以及delete请求参数都在请求体中

      

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

`visits`:`访问量`

`disContent`: `发帖内容`

`disVolume`:`20(评论数量)`

#### 3.备注

通过**数组**形式返回,返回的帖子与用户无关，按照时间从最新到最老排序

$disContent$内容如下$JSON$格式

`title`：`文章标题（String）`

`image`：`文章首页照片（base64编码)`

`Date`:`文章发布日期`

`subtext`:`正文开头部分，不超过30个字`

***

## 获取随机帖子列表

请求路径`/discuss/list/random`

请求方式：`get`

接口描述：**获取符合正态分布的帖子列表，其中最新的较多，老的较少。**

#### 1.参数列表

`num`:`需要的数量`

#### 2.返回数据

`num`: `返回的帖子数量（当需要的数量超过帖子总量就只会返回全部的帖子）`

`article`:`帖子信息列表，是JSON格式的数组`

**备注：**

`article`为 $ JSON $ 数组,键值对如下

`id`:`帖子的id`

`user_id`:`帖子属于的用户id`

`title`:`帖子的标题`

`date`:`帖子发布的日期(例如 2023-10-10T10:10:09)`

`vistis`:`访问量`





***

### 获取帖子正文

请求路径`/discuss/list/text`

请求方式：`get`

接口描述：**获取具体的帖子正文内容,该接口每调用一次，查询的帖子访问量加一**

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

`vistis`:`访问量`

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

接口描述：**用于删除帖子(已实现)以及帖子中的所有评论（已实现）**



#### 1.请求参数

`id`: `用户id`

`time`: `当前时间戳`

`disId`: `帖子id`

#### 2.返回数据

`success`: `true`

## 

### 发布评论

请求路径：`/discuss/detail`

请求方式：`post`

接口描述：**用于发布评论**



#### 1.请求参数

`id`:`用户id`

`time`:`当前时间戳（iso)`

`detail`:`评论内容`

`disId`:`帖子id`



#### 2.返回数据

`success`:`true`(字符串)

`discus`:`评论id`



***

### 删除评论

请求路径：`/discuss/detail`

请求方式：`delete`

接口描述：**用于删除评论**



#### 1.请求参数

`id`:`用户id`

`time`:`当前时间戳（ISO）`

`disId`:`评论id`



#### 2.返回数据

`success`:`true`



***

### 获取具体帖子的评论内容

请求路径：`/discuss/list/detail`

请求方式：`get`

接口描述：**用于获取具体帖子的评论，注意与用户有关的数据如果获取失败的话会不存在该键值对（u_id除外）**



#### 1.请求参数

`disId`:`帖子id`

`id`:`用户id`

`time`:`当前时间（ISO）`



#### 2.返回数据

`detailName`:`用户姓名`

`detailPic`:`用户头像（base64）`

`detailContent`:`评论内容`

`id`:`评论id`

`u_id`:`评论所属用户id`

`dateReputation`:`2023-10-10(评论发布的时间)`

#### 3.备注

通过数组形式返回

判断一个用户是否有删除权限时请检查u_id是否相同，因为返回的回帖人信息是评论发布时候的信息，可能会有所更改。但是id是数据库主键，只要账号不是注销了这个就不会变。

***

# 测试

   简单的测试样例在`test.py`中。注意$base64$编码有格式要求，随意填写可能会出现转换后的数据与原始数据不同。另外为了方便测试，本人已经关闭了部分查询优化，使得插入结果能够实时更新。如果需要测试高并发场景请联系作者开启优化。

  本程序运行时会在控制台输出一些调试信息，如果使用中出现问题，请截图后询问作者，如果不需要调试信息，觉得降低性能，可以注释掉文件中所有的$System.out$开头的函数调用。

  本程序的使用需要联动另外的用户登录那边的数据查询接口。如果你没有开启用户登录注册服务，那么查询时将不会在结果中出现发帖者信息相关的字段，本程序依然能够正常运行。具体字段请查看**获取帖子列表**。

  

***

# 文件储存设计

运行时产生的帖子信息储存在数据库中，帖子的正文储存在项目根目录下的`discuss`目录下。一个帖子有三个个文件一个是`id`+`_text.json`,储存帖子的标题，正文，图片，日期等信息。具体可以进行插入之后查看。另外一个文件是`id`，是该文件存储图片的首页照片信息，由base64编码储存。第三个帖子的评论文件储存在`discuss/comment`目录下，命名方式为`id`+`_comment.json`.