function checkSystem() {
    const tools = [
        {name: "Node.js",status: "Ready ✅"},
        {name: "NPM",status: "Ready ✅"},
        {name:"MySQL", status: "Installing...⏳"},
        {name:"MongoDB", status: "Ready ✅"}
    ]

    tools.forEach(tool => {
      console.log(`${tool.name}:${tool.status}`);  
    });
}

checkSystem();