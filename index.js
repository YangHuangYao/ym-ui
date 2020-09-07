#!/usr/bin/env node
const program = require('commander')
const download = require('download-git-repo')
const handlebars = require('handlebars')
const inquirer = require('inquirer')
const ora = require('ora')

program.version('0.0.1')
const templates = {
  admin: {
    url: 'https://github.com/YangHuangYao/vue-template-admin.git',
    downloadUrl: 'https://github.com/YangHuangYao/vue-template-admin.git',
    description: '管理系统模板',
  },
}

program
  .command('init <template> <project>')
  .description('初始化项目模板')
  .action((templateName, projectName) => {
    const { downloadUrl } = templates[templateName]
    download(downloadUrl, projectName, { clone: true }, (err) => {
      if (err) {
        return console.log('下载失败')
      }
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'name',
            message: '请输入项目名称',
          },
          {
            type: 'description',
            name: 'name',
            message: '请输入项目简介',
          },
          {
            type: 'input',
            name: 'author',
            message: '请输入作者名称',
          },
        ])
        .then((answers) => {
          console.log('answers: ', answers)
          const packagePath = `${projectName}/package.json`
          const packageContent = fs.readFileSync(packagePath, 'utf8')
          const packageResult = handlebars.compile(packageContent)(answers)
          fs.writeFileSync(packagePath, packageResult)
          console.log('初始化模板成功')
        })
    })
  })
