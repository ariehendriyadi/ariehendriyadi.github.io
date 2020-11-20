function getResultMatchesJSON(data) {
    var tableDataMatches = "";
    var tableMatchesHtml = "";

    var dataMatch = data.matches;
    var matchDays = [];
    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    };

    for(let i = 0; i < dataMatch.length; i++) {
        matchDays.push(dataMatch[i].matchday);
    }


    /* Separating matches by date(matchday) */
    let idx = 0;
    for(let i = 0; i < dataMatch.length; i++) {
        if (dataMatch[i].matchday === matchDays.filter(unique)[idx]) {
            // Tambah row
            tableDataMatches += `
                <tr>
                    <td> ${dataMatch[i].homeTeam.name} </td>
                    <td> (${new Date(dataMatch[i].utcDate).toLocaleTimeString()}) </td>
                    <td> ${dataMatch[i].awayTeam.name} </td>
                    <td> <a href="/pages/detail-pages/detailMatch.html?id=${dataMatch[i].id}">Detail</a> </td>
                </tr>
            `;
        } else {
            // Tambah tabel
            tableMatchesHtml += `
                <div class="card">
                    <div class="card-content">
                        <span class="card-title center-align">${convertDate(new Date(dataMatch[i-1].utcDate).toLocaleDateString())}</span>
                        <table class="responsive-table striped centered">
                            <thead>
                                <tr>
                                    <th>Home</th>
                                    <th>Kick Off</th>
                                    <th>Away</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ` + tableDataMatches + `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            // Kosongkan row
            tableDataMatches = "";
            
            // Tambah row
            tableDataMatches += `
                <tr>
                    <td> ${dataMatch[i].homeTeam.name} </td>
                    <td> (${new Date(dataMatch[i].utcDate).toLocaleTimeString()}) </td>
                    <td> ${dataMatch[i].awayTeam.name} </td>
                    <td> <a href="/pages/detail-pages/detailMatch.html?id=${dataMatch[i].id}">Detail</a> </td>
                </tr>
            `;

            idx++;
        }
    }

    // Tambah tabel
    tableMatchesHtml += `
        <div class="card">
            <div class="card-content">
                <span class="card-title">${convertDate(new Date(dataMatch[dataMatch.length-1].utcDate).toLocaleDateString())}</span>
                <table class="responsive-table striped centered">
                    <thead>
                        <tr>
                            <th>Home</th>
                            <th>Kick Off</th>
                            <th>Away</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ` + tableDataMatches + `
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById("matches").innerHTML = tableMatchesHtml;
}

function getResultMatchDetailJSON(data) {
    var tableMatchDetailHtml = "";

    match = data.match;
    h2h = data.head2head;

    tableMatchDetailHtml += `
        <div class="left-align">Matchday: ${match.matchday}</div>
        <div class="left-align">
            Kick Off: ${convertDate(new Date(match.utcDate).toLocaleDateString())} 
            - 
            ${new Date(match.utcDate).toLocaleTimeString()}
        </div>

        <div class="row">
            <div class="col s5 m5 l5 center-align"> <h5> <a href="/pages/detail-pages/detailTeam.html?id=${match.homeTeam.id}">${match.homeTeam.name}</a> </h5> </div>
            <div class="col s2 m2 l2 center-align"> <h5> - </h5> </div>
            <div class="col s5 m5 l5 center-align"> <h5> <a href="/pages/detail-pages/detailTeam.html?id=${match.awayTeam.id}">${match.awayTeam.name}</a> </h5> </div>
        </div>

        <h6 class="center-align">${match.venue}</h6>
        <hr>
        <div class="center-align">Number of Matches: ${h2h.numberOfMatches}</div>
        <div class="center-align">Total Goals: ${h2h.totalGoals}</div>

        <table class="striped centered" style="margin-top: 30px; margin-bottom: 30px;">
            <thead></thead>
            <tbody>
                <tr>
                    <td>${h2h.homeTeam.wins}</td>
                    <td style="font-weight: bold;">Wins</td>
                    <td>${h2h.awayTeam.wins}</td>
                </tr>
                <tr>
                    <td>${h2h.homeTeam.draws}</td>
                    <td style="font-weight: bold;">Draws</td>
                    <td>${h2h.awayTeam.draws}</td>
                </tr>
                <tr>
                    <td>${h2h.homeTeam.losses}</td>
                    <td style="font-weight: bold;">Loses</td>
                    <td>${h2h.awayTeam.losses}</td>
                </tr>
            </tbody>
        </table>

        <div class="right-align" style="font-size: 12px;">Last Updated: ${convertDate(new Date(match.lastUpdated).toLocaleDateString())}</div>
    `;

    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tableMatchDetail").innerHTML = tableMatchDetailHtml;
}

function getResultMatchFavoritesJSON(data) {
    var tableMatchFavoriteHtml = "";
    let number = 1;

    tableMatchFavoriteHtml += `
        <table class="striped centered">
            <thead>
                <tr>
                    <th>Num</th>
                    <th>Match Date</th>
                    <th>Teams</th>
                    <th>Detail</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function(match) {
        tableMatchFavoriteHtml += `
            <tr>
                <td>${number}</td>
                <td>${convertDate(new Date(match.match.utcDate).toLocaleDateString())}</td>
                <td>${match.match.homeTeam.name} - ${match.match.awayTeam.name}
                </td>
                <td><a href="/pages/detail-pages/detailMatch.html?id=${match.match.id}&saved=true">Detail</a></td>
                <td>
                    <a class="waves-effect waves-light btn-small red" onclick="removeFromFavorites(${match.match.id}, 'favorite_match')">
                        <i class="large material-icons">delete</i>
                    </a>
                </td>
            </tr>
        `;

        number++;
    });

    tableMatchFavoriteHtml += `
            </tbody>
        </table>
    `;

    document.getElementById("favorite-item").innerHTML = tableMatchFavoriteHtml;
}