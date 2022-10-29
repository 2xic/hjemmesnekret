import { TestContainer } from "./TestContainer"
import util from 'node:util';

export function MakeCallable(entryItems: unknown[] | unknown[][], container: TestContainer) {
	return (name: string, options: (...args: any[]) => void) => {
		entryItems.forEach((item: unknown[] | unknown) => {
			if (Array.isArray(item)) {
				container.addTest(util.format(name, ...item), () => options(...item) as any)
			} else {
				container.addTest(name, () => options(item) as any)
			}
		})
	}
}
