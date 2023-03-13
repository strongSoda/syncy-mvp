const logUsage = async (user: any, MESSAGE_TYPE: string, payload: any) => {
    // e.preventDefault();
    const webhookUrl = process.env.REACT_APP_SLACK_INCOMING_WEBHOOK_URL;


    const USAGE_LOGS = {
        SUCCESS: `Successfully logged ${MESSAGE_TYPE}`,
        ERROR: `Error logging ${MESSAGE_TYPE}`,
    }

    const data = {
        text: `*${MESSAGE_TYPE}*`,
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*${MESSAGE_TYPE}*`,
                },
            },
            {
                type: 'section',
                fields: [
                    {
                        type: 'mrkdwn',
                        text: `*User Email*: ${user?.email}`,
                    },
                    {
                        type: 'mrkdwn',
                        // PST Time
                        text: `*Time*: ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}`,
                    },
                    {
                        type: 'mrkdwn',
                        text: `*Payload*: ${JSON.stringify(payload)}`,
                    },
                ],
            },
        ],
    };

    let res = await fetch(webhookUrl as any, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (res.status === 200) {
        // alert("Message Sent!")
        console.log(USAGE_LOGS.SUCCESS);
    } else {
        console.log(USAGE_LOGS.ERROR);
        // alert("There was an error.  Please try again later.")
    }

}

export default logUsage;
