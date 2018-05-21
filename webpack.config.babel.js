/*
* @Author: chenchao
* @Date: 2017-08-15 14:34:08
* @Email: chenchao3@sh.superjia.com
* @Last Modified by: chenchao
* @Last Modified time: 2018-01-29 17:34:34
*/

import webpack from 'webpack';
import path from 'path';  //nodejs  path核心模块  文件管理
import os from 'os';  //nodejs os模块 系统信息管理操作
import autoprefixer from 'autoprefixer';  //postcss自动添加css前缀插件
import ExtractTextPlugin from 'extract-text-webpack-plugin';  //在js  import  css   独立css出来的工具
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';  //css压缩工具
import WebpackNotifierPlugin from 'webpack-notifier';  //打包完成提示
import CopyWebpackPlugin from 'copy-webpack-plugin';  //复制目录或者文件至打包后的dist
import HtmlWebpackPlugin from 'html-webpack-plugin';  //html生成插件
import CleanWebpackPlugin from 'clean-webpack-plugin';  //清除dist目录插件
import ZipWebpackPlugin from 'zip-webpack-plugin';  //打包完成后dist目录压缩成zip
import ProgressBarPlugin from 'progress-bar-webpack-plugin'; //打包进度条
import chalk from 'chalk';  //打包进度条配合插件
import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin';  //多进程uglifyJS  速度更快
import ImageminPlugin from 'imagemin-webpack-plugin';  //图片压缩插件
//import HappyPack from 'happypack';  //共享线程池，加快打包速度  感觉已过时？

//const happyThreadPool = HappyPack.ThreadPool({ size: 2 });

let webpackConfig = {
    //context:`${process.cwd()}/app`,
    entry:{
        main: path.resolve(__dirname,"app/main.js"),  //单独文件打包
        //redux: path.resolve(__dirname + "/app/redux/containers/index.js"),  //单独文件打包
        /*index5:__dirname + "/app/index5.js",  //单独文件打包*/
        //router:"./router.js"
        //redux:"./app/redux.js"
        vendor:['react','react-dom','react-router'],  //公用文件 js文件会自动生成common.js css文件会自动生成common.css
        common:['tools','./app/css/base.scss','./app/css/reset.scss'],
    } , //入口文件,多个使用数组
    output: {
        path: path.resolve(__dirname,"dist"), //打包后的文件存放的地方
        filename: "__dirname[hash].js", //打包后输出文件的文件名
        publicPath:"/" // 输出解析文件的目录，url 相对于 HTML 页面
    },
    devServer:{
        host: "localhost",  //域名
        port: 8080, //端口号
        contentBase: "./dist", //本地服务器所加载的页面所在的目录
        historyApiFallback: false, //不跳转
        inline: true,  //浏览器刷新
        //hot: true,  //热更新  不知道为什么加上后浏览器就不会自动刷新
        open: true  //自动打开页面contentBased目录的index.html
    },
    watch: true,
    devtool: 'source-map',
    //stats: 'errors-only',  //控制显示哪些包的信息
    resolve: {
        alias: {   //文件路径别名
           tools: path.resolve(__dirname,'app/global/module/tools.js'),
           cm: path.resolve(__dirname,'app/global/module/cm.js')
        }
    },
    module: {
        rules: [{ //模块规则
            test: /\.js[x]?$/, //匹配文件
            exclude: /node_modules/, //排除node_modules
            loader: "babel-loader?cacheDirectory", //加载器 缓存？
            query: {
                presets: ["es2015", "stage-0", "react"] //转码
            }
        }, {
            test: /\.css$/,
            use:ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?sourceMap','postcss-loader?sourceMap' ]})
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?sourceMap','postcss-loader?sourceMap','sass-loader?sourceMap'] }),
        }, {
            test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
            loader: 'file-loader?name=[name]_[sha512:hash:base64:7].[ext]'
        }]
    },
    plugins: [
        new ProgressBarPlugin({
          format: `${chalk.bold('[:bar]')} ${chalk.cyan.bold(':percent (:elapseds)')} :msg`,
          clear: true,
          summary: false,
          summaryContent: false,
          customSummary (buildTime) {
            process.stdout.write(`=====${chalk.green.bold(`[ built in ${buildTime} ]`)}=====`)
          }
        }),
        new webpack.BannerPlugin('webpack打包工具'),  //开头版权
        new ExtractTextPlugin("[name].css"), //提取出来的样式放在[name].css文件中*/
        new webpack.LoaderOptionsPlugin({     //私有前缀postcss
            options: {
                postcss: [autoprefixer({browsers:['last 1 versions','iOS >= 9', 'Android >= 4.3', 'ie >= 9']})]  //最新2个加前缀的
            },
            debug: true
        }),
        new webpack.optimize.CommonsChunkPlugin({    //入口entry的common打包  只包含js  css在上面
                name: ['common', 'vendor'],
                minChunks: Infinity  //不需要抽取公共代码到这个文件中
        }),
        new WebpackNotifierPlugin({  //打包完成后的通知
            title: 'Webpack 编译成功',
            contentImage: path.resolve(process.cwd(),'./app/image/logo.png'),
            alwaysNotify: true
        }),
        new webpack.ProvidePlugin({  //全局载入的可以调用的组件名称
/*            $: 'jquery',
            jQuery: 'jquery',*/
            React: 'react',
            ReactDOM: 'react-dom',
            tools: 'tools',
            cm: 'cm'
        }),
        //new CopyWebpackPlugin([   //复制目录或者文件至打包后的dist
        //    {
        //        context: 'app/image',  //源路径
        //        from: '**/*',  //匹配文件
        //        to: 'image',  //目标路径
        //    }],
        //    {
        //        ignore:[
        //            '*.txt'   //忽略后缀类型
        //        ]
        //    }
        //),
        new ImageminPlugin({  //图片压缩插件
            test: /\.(jp[e]?g|png|gif|svg)$/i,
            disable: false,
            pngquant: {
                quality: '80'
            }
        }),
/*        new HtmlWebpackPlugin({  //自动生成html文件并载入打包后的css js
            title: 'react-redux',
            filename: 'redux.html',
            template: 'app/redux.html',
            inject: 'body',  //默认插入body底部 选项：true, body, head, false
            //favicon: '路径' title图标
            minify: false,  //是否压缩html文件
            //hash: false,   //给生成的 js 文件一个独特的 hash 值
            //cache: false,  //在内容变化时才生成一个新的文件
            chunks: ['common','redux'],  //指定引入哪些特定的文件
            //excludeChunks: ['main'],  //排除掉哪些文件
            //xhtml: true  //如果为true,则以兼容xhtml的模式引用文件
        }),*/
        new HtmlWebpackPlugin({  //自动生成html文件并载入打包后的css js
            title: 'react-main',
            filename: 'main.html',
            template: 'app/main.html',
            inject: 'body',  //默认插入body底部 选项：true, body, head, false
            //favicon: '路径' title图标
            minify: false,  //是否压缩html文件
            //hash: false,   //给生成的 js 文件一个独特的 hash 值
            //cache: false,  //在内容变化时才生成一个新的文件
            chunks: ['vendor','common','main'],  //指定引入哪些特定的文件
            chunksSortMode: 'manual' //chunks按照顺序插入，而不是乱的  values: 'none' | 'auto' | 'dependency' |'manual' | {function} - default: 'auto'
            //excludeChunks: ['main'],  //排除掉哪些文件
            //xhtml: true  //如果为true,则以兼容xhtml的模式引用文件
        }),
        new webpack.DefinePlugin({
            __DEV__: process.env.NODE_ENV === 'development' ? true : false,
        }),
    ]
}

if(process.env.NODE_ENV === 'production'){  //产品模式压缩js css
    delete webpackConfig.devtool;  //产品模式不调试
    delete webpackConfig.watch;  //产品模式直接打包
    webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify("production")
          },
          __DEV__: false,
        }),
/*        new webpack.optimize.UglifyJsPlugin({  //js压缩工具
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            sourceMap: true,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的console语句 产品模式删除  开发模式显示
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),*/
        new ParallelUglifyPlugin({
            workerCount: os.cpus().length,  //cpu核心数
            uglifyJS:{
                output:{
                    beautify: false,
                    comments: false,
                },
                compress:{
                    warnings: false,
                    drop_console: true,
                    collapse_vars: true,
                    reduce_vars: true,
                }
            }

        }),
        new OptimizeCssAssetsPlugin({  //css压缩去除注释
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),
        new CleanWebpackPlugin(
            ['zip','dist'],  //清空文件夹名称
            {   root: process.cwd(),  //根目录
                verbose: false,  //是否在控制台输出
                dry: false,  //false直接删除文件  true模拟删除
                exclude: [''], //排除不删除的目录
                watch: false,  //true删除文件重新编译
                allowExternal: false  //允许是否在webpack跟外清除文件夹，默认false 不允许
            }
        ),
        new ZipWebpackPlugin({
            path: '../uploadZip',  //相对于根目录
            filename: 'mine-react-app.zip'
        }),
    ]);
}

export default webpackConfig
