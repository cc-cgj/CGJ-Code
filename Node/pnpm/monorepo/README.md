### Monorepo 架构是将所有项目的代码统一维护在一个单一的版本控制系统仓库中。

这种架构方式与传统的多代码库（multi-repo）相对，后者是指每个项目或模块都拥有独立的代码仓库。下面是 Monorepo 架构的一些特点：

1. 集中管理：所有项目的代码都在同一个地方进行管理，这有利于跨项目共享代码和资源。
2. 提高协作效率：团队成员可以在同一仓库内协作，快速访问和修改相关项目代码，而不需要切换不同的仓库。
3. 简化依赖管理：由于所有项目都在一个仓库中，依赖关系更清晰，便于处理项目间的依赖问题。
4. 一致的工具和流程：可以使用统一的构建系统、测试框架和部署流程，减少配置和环境搭建的复杂性。
5. 代码复用：不同项目间可以更容易地复用代码，提高开发效率。
6. 集中式版本控制：所有项目的变更历史都在一个仓库中，方便审查和管理。

总的来说，Monorepo 架构适合那些项目之间联系紧密、需要频繁共享代码和库的公司或团队。然而，这种架构也可能带来一些问题，如仓库体积过大、权限管理复杂等。因此，是否采用 Monorepo 架构应根据具体的组织结构、工作流程和技术需求来决定。

### 多个项目, 使用 npm 则需要每个项目执行 npm install 安装依赖包

1. 根目录的 node_modules 会安装公共的依赖包
2. 每个项目的 node_modules 只会安装该项目的依赖包


### pnpm --filter <package_selector> <command>
  在根目录下执行 react-demo项目的dev命令
    pnpm --filter/-F react-demo dev

### pnpm --filter <package_selector> add <package_depend>
  根目录/react-demo目录下执行
  pnpm --filter/-F react-demo add common // 在react-demo项目中添加工作空间的common作为依赖项
