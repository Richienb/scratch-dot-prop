/* global Scratch */
/// <reference types="scratch-env"/>
import dotProp from "dot-prop"
import parseJson from "json-parse-even-better-errors"

class ScratchDotProp implements ScratchExtension {
	getInfo(): ExtensionMetadata {
		return {
			id: "DotProp",
			name: "Dot Prop",
			blocks: [{
				opcode: "get",
				blockType: Scratch.BlockType.REPORTER,
				text: "Get [path] from [object] and use [defaultValue] if not found",
				arguments: {
					path: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: "a.b"
					},
					object: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: `{"a":{"b":"Hello World"}}`
					},
					defaultValue: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: "Value not found"
					}
				}
			}, {
				opcode: "set",
				blockType: Scratch.BlockType.REPORTER,
				text: "Set [path] in [object] to [value]",
				arguments: {
					path: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: "a.c"
					},
					object: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: `{"a":{"b":"Hello World"}}`
					},
					value: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: "Lorem ipsum"
					}
				}
			}, {
				opcode: "has",
				blockType: Scratch.BlockType.REPORTER,
				text: "Does [object] contain [path]",
				arguments: {
					object: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: `{"a":{"b":"Hello World"}}`
					},
					path: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: "a.b"
					}
				}
			}, {
				opcode: "delete",
				blockType: Scratch.BlockType.REPORTER,
				text: "Delete [path] from [object]",
				arguments: {
					path: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: "a.b"
					},
					object: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: `{"a":{"b":"Hello World"}}`
					}
				}
			}]
		}
	}

	get({path, object, defaultValue}: {path: string, object: string, defaultValue: string}) {
		const result = dotProp.get(parseJson(object), path, defaultValue)
		return typeof result === "object" ? JSON.stringify(result) : result
	}

	set({path, object, value}: {path: string, object: string, value: string}) {
		return JSON.stringify(dotProp.set(parseJson(object), path, value))
	}

	has({object, path}: {object: string, path: string}) {
		return dotProp.has(parseJson(object), path)
	}

	delete({object, path}: {object: string, path: string}) {
		const parsedObject = parseJson(object)

		dotProp.delete(parsedObject, path)
		return JSON.stringify(parsedObject)
	}
}

Scratch.extensions.register(new ScratchDotProp())
