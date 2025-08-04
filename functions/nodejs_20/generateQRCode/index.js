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

    // 检查输入的必要参数
    if (!content) {
        throw new Error("参数 'content' 是必需的");
    }

    try {
        // 生成二维码并获取DataURL
        const qrCodeUrl = await QRCode.toDataURL(content, {
            width: size,
            height: size,
            margin: 1
        });

        logger.info("二维码生成成功");
        return { qrCodeUrl };
    } catch (error) {
        logger.error("二维码生成失败", error);
        throw new Error("二维码生成过程中出现错误");
    }
}
