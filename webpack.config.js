// webpack 配置文件

 // 这个配置文件，其实就是一个 JS 文件，通过 Node 中的模块操作，向外暴露了一个配置对象

 const path = require('path')

 const webpack = require('webpack')  //启动热更新的第2步

 //只要是差点，就要放在plugins节点中去
 const htmlWebpackPlugin = require('html-webpack-plugin')

//  . Vue-loader 在 15.* 之后的版本都是 vue-loader 的使用都是需要伴生 VueLoaderPlugin 的,
 const VueLoaderPlugin = require('vue-loader/lib/plugin')


 module.exports = {
    //入口
    entry:path.join(__dirname,'./src/main.js'),
    //出口
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js'
    },
    devServer: {//webpack-dev-server的配置
        contentBase: path.join(__dirname, 'src'),  //启动路径
        host:'localhost',  //域名
        port: 3000,  //端口号
        open: true, // 自动打开页面
        hot: true, //启动热更新的第1步
    },
    plugins:[//配置插件的节点
        //启动热更新的第3步
        new webpack.HotModuleReplacementPlugin() , //new一个热更新的模块对象
        
        new htmlWebpackPlugin({//创建一个在内存中生成html页面的插件
            template:path.join(__dirname,'./src/index.html'),//指定模板页面，将来会根据指定的路径去生成内存中的页面

            filename:'index.html'//指定生成的页面的名称
        }),

        //. Vue-loader 在 15.* 之后的版本都是 vue-loader 的使用都是需要伴生 VueLoaderPlugin 的,
        new VueLoaderPlugin()
    ],
    module:{// 这个节点用于配置所有的第三方模块加载器
        rules:[ //所有第三方模块的匹配规则
            // 从后往前调用，后一个处理完，交给前一个
            {test:/\.css$/, use:['style-loader','css-loader']}, //匹配所有以css结尾的文件
            //匹配.less文件
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            //匹配.scss文件
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},

            // 匹配图片路径
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=10819803 '},
            // {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=10819803&name=[hash:8]-[name].[ext] '},
            //limit给定的值，是图片的大小，单位是字节（byte），如果我们引用的图片大于或者等于给定的limit值，
            //则不会被转为 base64格式的字符串

            //这是处理字体文件的loader
            {test:/\.(ttf|eot|svg|woff|woff2|otf)$/,use:'url-loader'},

            // 配置babel来转换高级的js语法
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},

            //配置 .vue文件
            {test:/\.vue$/,use:'vue-loader'},
        ]
    },
    resolve:{
        alias:{
            //这是设置导入vue包的时候加载文件的路径
            // "vue$":"vue/dist/vue.js"
        }
    }

 }