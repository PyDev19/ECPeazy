export function accordion(node: HTMLElement, is_open: boolean) {
    let initial_height = node.scrollHeight;
    node.style.height = is_open ? initial_height + 'px' : '0';
    node.style.overflow = "hidden";
    node.style.opacity = is_open ? '1' : '0';

    return {
        update(is_open: boolean) {
            let current_height = node.scrollHeight;
            let animation;

            if (is_open) {
                node.style.height = '0';
                node.style.opacity = '0';
                animation = node.animate(
                    [
                        { height: '0', opacity: '0' },
                        { height: current_height + 'px', opacity: '1' }
                    ],
                    { duration: 300, fill: 'both' }
                );
            } else {
                animation = node.animate(
                    [
                        { height: current_height + 'px', opacity: '1' },
                        { height: '0', opacity: '0' }
                    ],
                    { duration: 300, fill: 'both' }
                );
            }

            animation.onfinish = () => {
                node.style.height = is_open ? current_height + 'px' : '0';
                node.style.opacity = is_open ? '1' : '0';
            };
        }
    };
}
