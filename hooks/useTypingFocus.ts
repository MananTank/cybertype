import { useRef, useEffect } from 'react';

// bring focus to element when typing starts
export function useTypingFocus() {
	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			// ignore enter or tab
			if (event.key === 'Tab' || event.key === 'Enter') return;

			if (document.activeElement !== ref.current) {
				if (ref.current)
					ref.current.focus({
						preventScroll: true,
					});
			}
		}

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return ref;
}
