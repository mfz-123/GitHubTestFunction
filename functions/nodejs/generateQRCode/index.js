const QRCode = require('qrcode');

/**
 * @description 生成二维码图片的云函数
 * @param {Object} params - 参数对象，包括二维码内容和尺寸
 * @param {Object} context - 上下文对象
 * @param {Logger} logger - 日志记录器
 * @return {Object} 返回生成的二维码图片URL
 */
module.exports = async function (params, context, logger) {
    const { content, size = 200 } = params; // 从参数中解构出内容和尺寸，尺寸默认为200px
    
    // 参数验证
    if (!content) {
        logger.error("缺少必要参数: content");
        throw new Error("二维码内容不能为空");
    }
    
    if (size && (typeof size !== 'number' || size <= 0)) {
        logger.error("无效的尺寸参数", { size });
        throw new Error("尺寸必须是大于0的数字");
    }

    try {
        // 生成二维码数据URL
        const qrCodeUrl = await QRCode.toDataURL(content, {
            width: size,
            height: size,
            margin: 1,
            color: {
                dark: '#000000', // 二维码点颜色
                light: '#ffffff' // 背景色
            }
        });

        logger.info("二维码生成成功", { contentLength: content.length, size });
        
        return { qrCodeUrl };
    } catch (error) {
        logger.error("二维码生成失败", { error: error.message, content });
        throw new Error("二维码生成失败: " + error.message);
    }
}
