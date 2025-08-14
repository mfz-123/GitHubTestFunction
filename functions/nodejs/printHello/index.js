/**
 * @description 打印"hello"的简单云函数
 * @param {Object} params - 参数对象（本函数不需要参数）
 * @param {Object} context - 上下文对象
 * @param {Logger} logger - 日志记录器
 * @return {Object} 返回包含hello消息的对象
 */
module.exports = async function (params, context, logger) {
    // 记录函数开始执行的日志
    logger.info("开始执行hello函数");
    
    // 返回包含hello消息的对象
    return {
        message: "hello"
    };
}
