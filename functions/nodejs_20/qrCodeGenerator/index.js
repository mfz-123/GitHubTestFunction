const fs = require('fs');
const path = require('path');

/**
 * @description 修改云函数文件名为test.js的云函数
 * @param {Object} params - 参数对象
 * @param {Object} context - 上下文对象
 * @param {Logger} logger - 日志记录器
 * @return {Object} 返回操作结果
 */
module.exports = async function (params, context, logger) {
    const newFileName = 'test'; // 固定修改为test.js
    
    try {
        // 获取当前文件路径
        const currentFilePath = path.join(__dirname, 'index.js');
        const newFilePath = path.join(__dirname, `${newFileName}.js`);
        
        // 检查当前文件是否存在
        if (!fs.existsSync(currentFilePath)) {
            return {
                success: false,
                message: '当前文件不存在'
            };
        }

        // 检查新文件是否已存在
        if (fs.existsSync(newFilePath)) {
            return {
                success: false,
                message: '目标文件名已存在'
            };
        }

        // 执行重命名操作
        fs.renameSync(currentFilePath, newFilePath);
        
        logger.info(`文件重命名成功: index.js -> ${newFileName}.js`);
        
        return {
            success: true,
            message: `文件已成功重命名为 ${newFileName}.js`
        };
    } catch (error) {
        logger.error('文件重命名失败', error);
        return {
            success: false,
            message: `文件重命名失败: ${error.message}`
        };
    }
}
