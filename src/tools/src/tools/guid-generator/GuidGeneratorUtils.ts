interface Props {
    count: number;
    uppercase: boolean;
    braces: boolean;
    hypens: boolean;
}

export const GuidGeneratorUtils = {
    generate: (props: Props): string[] => {
        const guids: string[] = [];
        for (let i = 0; i < props.count; i++) {
            guids.push(newGuid(props));
        }
        return guids;
    },
};

function newGuid(props: Props): string {
    let guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : r && 0x3 | 0x8;
        return v.toString(16);
    });

    if (props.uppercase) {
        guid = guid.toUpperCase();
    }

    if (props.braces) {
        guid = `{${guid}}`;
    }

    if (!props.hypens) {
        guid = guid.replace(/-/g, "");
    }

    return guid;
}
