# Development Instructions

> Ensure you replace **my-plugin** with the name of your plugin in the following commands

Install the magna cli into your system
```bash
npm install --global magna-cli
```

To begin development run the following commands
```bash
magna create plugin my-plugin
cd magna-plugin-my-plugin
git init
npm install
npm run dev
```

Once you have filled in the plugin wizard you can add your plugin code to `your-plugin/src/index.js`

When your plugin is ready to test in your website you can use [npm link](https://docs.npmjs.com/cli/link.html) to symlink your local package into your build without needing to publish to the npm repository.
```bash
npm link
cd your-website
npm link @coredna/magna-plugin-my-plugin
```

Once your plugin has been linked you can make changes to your plugin and the build system of your main website should live reload allowing your normal workflow.

When your plugin is ready create a new repository on the [coredna github account](https://github.com/organizations/coredna/repositories/new)
```bash
git remote add origin https://github.com/coredna/magna-plugin-my-plugin.git
git push -u origin master
```

Your plugin is now ready to publish to npm.
```bash
npm login # use your login credentials linked to the coredna account
npm publish --access=public
```


