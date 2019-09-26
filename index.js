class AddBuildNumberPlugin {
    constructor(options) {
        this.name = 'AddBuildNumberPlugin';
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tap(this.name, this.handle.bind(this));
    }

    handle(compilation) {
        const { assets } = compilation;
        const { buildNumber } = this.options;
        const files = Object.keys(assets).filter(name => new RegExp(this.options.test).test(name));

        this.options.output = this.options.output.replace('[build-number]', buildNumber || compilation[this.options.var]);

        this.rename(assets, files, compilation.hash);
    }

    rename(assets, files, hash) {
        files.forEach(name => {
            let output = this.options.output;

            if (this.options.needHash.test(name)) {
                output = this.options.output.replace('[hash]', hash);
            } else {
                output = this.options.output.replace('.[hash]', '');
            }

            const newKey = name.replace(this.options.test, output);
            assets[newKey] = assets[name];
            delete assets[name];
        });
    }
};

module.exports = AddBuildNumberPlugin;