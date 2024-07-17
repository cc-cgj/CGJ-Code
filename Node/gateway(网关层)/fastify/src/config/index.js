export const rateLimitConfig = {
  max: 3, // 在下面这个时间允许请求接口的最大次数
  timeWindow: "1 minute", // 时间范围
};

export const cachingConfig = {
  privacy: "private",
  expiresIn: 1000 * 60 * 60 * 24,
};
