let timer: NodeJS.Timeout;

export const debounce = (action: (...args: unknown[]) => void, time: number) => {
	clearTimeout(timer);
	timer = setTimeout(() => {
		action();
	}, time);
};
