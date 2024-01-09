export const startDetailsNodeGroups = () => {
    const nodes = document.querySelectorAll("details");
    const groups = {};
    nodes.forEach((node) => {
        const groupName = node.getAttribute("data-details-group");
        if (groupName) {
            let group = groups[groupName];
            group = group ? group : [];
            groups[groupName] = group;
            group.push(node);
            node.addEventListener("click", function (event) {
                group === null || group === void 0 ? void 0 : group.forEach((element) => {
                    if (element !== node) {
                        element.open = false;
                    }
                });
                if (node.open) {
                    event.preventDefault();
                }
            });
        }
    });
    console.log(groups);
};
