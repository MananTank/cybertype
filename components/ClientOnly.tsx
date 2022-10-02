import { useEffect, useState } from 'react';

type Props = {
	fallback?: JSX.Element;
	children: any;
};

export function ClientOnly(props: Props) {
	const [loaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	return loaded ? props.children : props.fallback || null;
}
