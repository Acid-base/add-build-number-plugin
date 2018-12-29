class AddBuildNumberPlugin {
    constructor(options) {
        this.name = 'AddBuildNumberPlugin';
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tap(this.name, this.handle.bind(this));
    }

    handle(compilation) {
        let { assets } = compilation;
        let files = Object.keys(assets).filter(name => new RegExp(this.options.test).test(name));
        this.options.output = this.options.output.replace('[build-number]', compilation[this.options.var]);

        this.rename(assets, files);
    }

    rename(assets, files) {
        files.forEach(name => {
            let newKey = name.replace(this.options.test, this.options.output);
            assets[newKey] = assets[name];
            delete assets[name];
        });
    }
};

module.exports = AddBuildNumberPlugin;