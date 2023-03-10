const logUsage = async (MESSAGE_TYPE: string, payload: any) => {
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
                    text: `*${MESSAGE_TYPE}* \n\n`,
                },
            },
            {
                type: 'section',
                fields: [
                    {
                        type: 'mrkdwn',
                        text: `*User Email*: ${payload?.user?.email} \n\n`,
                    },
                    {
                        type: 'mrkdwn',
                        // eslint-disable-next-line no-template-curly-in-string
                        text: `*Payload*: \n \`${JSON.stringify(payload)}\``,
                    },
                ],
            },
        ],
    };

    let res = await fetch(webhookUrl as any, {
        method: 'POST',
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
