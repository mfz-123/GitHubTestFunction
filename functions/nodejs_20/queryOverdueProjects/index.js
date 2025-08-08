/**
 * @description 查询当前运行中且已延期项目的云函数
 * @param {Object} params - 参数对象（本函数无入参）
 * @param {Object} context - 上下文对象，包含应用、用户、租户等信息
 * @param {Logger} logger - 日志记录器
 * @return {Object} 返回包含项目列表和数量的对象
 */
module.exports = async function (params, context, logger) {
    // 日志功能
    logger.info(`${new Date()} 函数开始执行`);

    try {
        // 获取当前时间
        const currentTime = new Date().getTime();

        // 查询运行中且已延期的项目
        const projects = await application.data.object("project")
            .select("*") // 查询所有字段
            .where({
                "status": "running", // 假设"running"表示运行中状态
                "end_date": application.operator.lt(currentTime) // 结束日期小于当前时间表示已延期
            })
            .find();

        // 获取项目数量
        const count = projects.length;

        logger.info(`查询到 ${count} 个运行中且已延期的项目`);

        return {
            projects: projects, // 项目列表
            count: count // 项目数量
        };
    } catch (error) {
        logger.error("查询项目时出错", error);
        throw new Error("查询运行中且已延期项目时发生错误");
    }
}
