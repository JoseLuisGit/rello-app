module.exports = {
    apps: [
      {
        name: 'Rello App Backend',
        script: './dist/index.js',
        watch: false,
        env: {
          NODE_ENV: 'production',
          DEBUG: 'false',
        },
        out_file: '/dev/null',
        error_file: '/dev/null'
      },
    ],
  };
  