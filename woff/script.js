import { woffId, lambdaUrl } from './params.js'

const addKintoneRecord = async (userId, place, date, startTime, endTime) => {
    let rec = {
        "userId": userId,
        "place": place,
        "date": date,
        "startTime": startTime,
        "endTime":  endTime,
    }

    console.log(rec)
    axios.post(lambdaUrl, rec)
        .then((res) => {
            console.log(res)

            let msg = "登録しました。\n" + "日付: " + date + "\n開始時間: " + startTime + "\n終了時間: " + endTime + "\n訪問先: " + place
            // send message
            woff.sendMessage({ 'content': msg }).then(() => {
                // Success
                console.log("message sent: " + msg)
                woff.closeWindow();
            }).catch((err) => {
                // Error
                console.log(err)
                window.alert(err);
            });
        })
        .catch((err) => {
            console.log("error")
            console.log(err);
        });
}

/**
 * Get profile
 */
const getProfile = () => {
    return new Promise((resolve, reject) => {
        // Get profile
        woff.getProfile().then((profile) => {
            // Success
            console.log(profile)
            resolve(profile)
        }).catch((err) => {
            // Error
            console.log(err)
            reject(err)
        });
    });
}

/**
 * Register event handlers for the buttons displayed in the app
 */
const registerButtonHandlers = (userId) => {
    document.getElementById('submit').addEventListener('click', function() {
        let date = document.getElementById('date').value
        let startTime = document.getElementById('startTime').value
        let endTime = document.getElementById('endTime').value
        let place = document.getElementById('place').value

        addKintoneRecord(userId, place, date, startTime, endTime)

        return
    }
    )
}

const woffInit = () => {
    // Initialize WOFF
    woff.init({ woffId: woffId })
        .then(() => {
            if (!woff.isLoggedIn()) {
                woff.login()
                woffInit()
            }
            // Success
            // Get and show user profile
            getProfile()
                .then((profile) => {
                    // Button handler
                    registerButtonHandlers(profile.userId);
                })
                .catch((err) => {
                    window.alert(err);
                });;
        })
        .catch((err) => {
            // Error
            //window.alert(err);
            console.error(err)
        });
}

// On load
window.addEventListener('load', () => {
    console.log(woffId)
    woffInit()
});

