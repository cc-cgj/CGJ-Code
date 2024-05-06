module.exports = {
  server: {
    proxy: {
      "/zszlfx-lt": {
        target: "http://192.168.1.230",
        changeOrigin: true,
      },
    },
  },
};
