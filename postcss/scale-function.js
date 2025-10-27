const valueParser = require('postcss-value-parser');

const SKIP_PROPS = new Set(['transform', '-webkit-transform', '-moz-transform', '-ms-transform']);

module.exports = () => ({
  postcssPlugin: 'postcss-scale-function',
  Declaration(decl) {
    if (!decl.value || decl.value.indexOf('scale(') === -1) {
      return;
    }

    if (SKIP_PROPS.has(decl.prop)) {
      return;
    }

    const parsed = valueParser(decl.value);
    let mutated = false;

    parsed.walk((node) => {
      if (node.type !== 'function' || node.value !== 'scale') {
        return;
      }

      const hasMultipleArguments = node.nodes.some((child) => child.type === 'div');
      if (hasMultipleArguments) {
        return;
      }

      const argument = valueParser.stringify(node.nodes).trim();
      if (!argument) {
        return;
      }

      const unitInfo = valueParser.unit(argument);
      const normalizedArgument =
        unitInfo && unitInfo.unit === '' ? `${unitInfo.number}px` : argument;

      node.type = 'word';
      node.value = `calc(var(--responsive-scale) * ${normalizedArgument})`;
      mutated = true;
    });

    if (mutated) {
      decl.value = parsed.toString();
    }
  },
});

module.exports.postcss = true;
