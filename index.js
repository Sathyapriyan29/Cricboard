let score = 0,
    wickets = 0,
    balls = 0;
let batsmen = {};
let bowlers = {};
let striker = "",
    nonStriker = "",
    currentBowler = "";
let teamName = "MI";

function playBall() {
    if (!striker || !nonStriker || !currentBowler) {
        striker = document.getElementById("batsman1").value.trim();
        nonStriker = document.getElementById("batsman2").value.trim();
        currentBowler = document.getElementById("bowler").value.trim();
        if (!striker || !nonStriker || !currentBowler) return alert("Fill all fields first");
    }

    const result = document.getElementById("runs").value;
    let run = 0;

    if (!batsmen[striker]) batsmen[striker] = {
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0
    };
    if (!batsmen[nonStriker]) batsmen[nonStriker] = {
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0
    };
    if (!bowlers[currentBowler]) bowlers[currentBowler] = {
        balls: 0,
        runs: 0,
        wickets: 0
    };

    if (result === "W") {
        wickets++;
        batsmen[striker].balls++;
        bowlers[currentBowler].balls++;
        bowlers[currentBowler].wickets++;
        striker = prompt("New batsman (replace out player):");
        if (!batsmen[striker]) batsmen[striker] = {
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0
        };
    } else {
        run = parseInt(result);
        score += run;
        batsmen[striker].runs += run;
        batsmen[striker].balls++;
        if (run === 4) batsmen[striker].fours++;
        if (run === 6) batsmen[striker].sixes++;
        bowlers[currentBowler].balls++;
        bowlers[currentBowler].runs += run;

        if (run % 2 !== 0)[striker, nonStriker] = [nonStriker, striker];
    }

    balls++;
    if (balls % 6 === 0)[striker, nonStriker] = [nonStriker, striker];

    updateUI();
}

function updateTeamName() {
    teamName = document.getElementById("teamName").value || "Team";
    updateUI();
}

function updateUI() {
    const overs = `${Math.floor(balls / 6)}.${balls % 6}`;
    document.getElementById("liveScore").textContent = `${teamName} ${score}/${wickets}`;
    document.getElementById("overInfo").textContent = `Overs: ${overs}`;

    const bTable = document.getElementById("battingTable");
    const bwTable = document.getElementById("bowlingTable");
    bTable.innerHTML = "";
    bwTable.innerHTML = "";

    for (let name in batsmen) {
        const b = batsmen[name];
        const sr = b.balls ? ((b.runs / b.balls) * 100).toFixed(1) : "0.0";
        const star = name === striker ? " ★" : "";
        bTable.innerHTML += `<tr><td>${name}${star}</td><td>${b.runs}</td><td>${b.balls}</td><td>${b.fours}</td><td>${b.sixes}</td><td>${sr}</td></tr>`;
    }

    for (let name in bowlers) {
        const bw = bowlers[name];
        const overs = `${Math.floor(bw.balls / 6)}.${bw.balls % 6}`;
        const eco = bw.balls ? (bw.runs / (bw.balls / 6)).toFixed(1) : "0.0";
        bwTable.innerHTML += `<tr><td>${name}</td><td>${overs}</td><td>${bw.runs}</td><td>${bw.wickets}</td><td>${eco}</td></tr>`;
    }
}