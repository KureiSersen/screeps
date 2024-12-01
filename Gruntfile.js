module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')

    grunt.initConfig({
        screeps: {
            options: {
                email: 'qaz1006ing@gmail.com',
                token: '338a7f1a-57bb-46dd-a690-da51bbb918bc',
                branch: 'default',
                // ptr: true,
                //server: 'season'
            },
            dist: {
                src: ['dist/*.js']
            }
        },
        clean: {
            'dist': ['dist']
        },
        // 将所有源文件复制到 dist 文件夹中并展平文件夹结构
        copy: {
            // 将游戏代码推送到dist文件夹，以便在将其发送到 screeps 服务器之前可以对其进行修改。
            screeps: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**',
                    dest: 'dist/',
                    filter: 'isFile',
                    rename: function (dest, src) {
                        // 通过将文件夹分隔符替换成下划线来重命名文件
                        return dest + src.replace(/\//g, '.');
                    }
                }],
            }
        },
    });

    grunt.registerTask('default', ['clean', 'copy:screeps', 'screeps']);
}