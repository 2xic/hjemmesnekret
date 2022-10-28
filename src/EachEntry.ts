import { TestContainer } from "./TestContainer"
import util from 'node:util';

export function MakeCallable(entryItems: unknown[] | unknown[][], cotnaienr: TestContainer) {
	return (name: string, options: (...args: any[]) => void) => {
		entryItems.forEach((item: unknown[] | unknown) => {
			if (Array.isArray(item)) {
				cotnaienr.addTest(util.format(name, ...item), () => options(...item) as any)
			} else {
				cotnaienr.addTest(name, () => options(item) as any)
			}
		})
	}
}
