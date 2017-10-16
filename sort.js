function getCellValue(node) {
	return node.children[0].children[0].value;
}

function _sort(nodes) {
	return nodes.sort((prev, next) => {
		// use toLowerCase to keep `case insensitive`
		prev = getCellValue(prev).toLowerCase();
		next = getCellValue(next).toLowerCase();

		// follow the alphabet order
		if (prev > next) {
			return 1;
		}

		if (prev < next) {
			return -1;
		}

		return 0;
	});
}

function sort(ast) {
	ast.children.forEach(child => {
		let staticProp = [];
		// prefix with `on`
		let dynamicProp = [];

		// find table markdown type
		if (child.type === 'table') {
			// slice will create new array, so sort can affect the original array.
			// slice(1) cut down the thead
			child.children.slice(1).forEach(node => {
				let value = getCellValue(node);
				if (/^on[A-Z]/.test(value)) {
					dynamicProp.push(node);
				} else {
					staticProp.push(node);
				}
			});

			child.children = [
				child.children[0],
				..._sort(staticProp),
				..._sort(dynamicProp)
			];
		}
	});

	return ast;
}

module.exports = {
	sort,
	getCellValue
};
