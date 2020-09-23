# XDN Spartacus for SAP Commerce Cloud (formerly SAP Hybris)

Spartacus is the official JavaScript headless front end for SAP Commerce Cloud. You can read more about Spartacus at the [official docs](https://sap.github.io/spartacus-docs/). Spartacus is written in Angular. Note that using Spartacus on the XDN requires an instance of SAP Commerce Cloud 1905 or later, and the XDN is compatible with Spartacus version 2.X.X and above.

# Getting Started

If you have not already done so, sign up for an account on the [XDN Console](https://moovweb.app/signup?redirectTo=/) and install the [XDN CLI](cli)

```bash
npm i -g @xdn/cli
```

Next, navigate to the root directory of your Spartacus project and run the XDN `init` command to add the XDN libraries your project:

```bash
cd my-project
xdn init
```

Finally, deploy your site on the XDN using the `deploy` command:

```bash
xdn deploy
```

Be aware that the deploy step will automatically build Spartacus for you which can take a few minutes. When the deployment finishes, the output will confirm the final deployment URL. Below is an example:

```bash
📡️ Uploading...
> Uploading package
done (9425ms)

⌛ Deploying to the Moovweb XDN...
done (48565ms)
🚀 Site deployed on default environment https://alice-my-project-default.moovweb-edge.io
```

Congrats! Your Spartacus site is now live on the XDN and you can login to the [XDN Console](https://moovweb.app) to manage your project.


