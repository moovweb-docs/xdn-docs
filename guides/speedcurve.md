# SpeedCurve Performance Monitoring

We currently use SpeedCurve to monitor speed on an ongoing basis starting with the development cycle and continuing beyond launch. It provides performance feedback of your site such as page size and how long it takes to load a page, and can show you the impact new features have on the performance of your site.

SpeedCurve's dashboards provide various perspectives and options. You can define and monitor performance metrics, analyze assets, find third-party content that might impact your website. You can also set a performance budget so you can see and track when the performance of the site lags. You can sign up for an account here - [https://speedcurve.com/setup/trial](https://speedcurve.com/setup/trial/)

Setting up a new site in SpeedCurve
-----------------------------------

1.  Log in to SpeedCurve, click on “Settings” on the left and then click on “Add Site”  
    
    ![domains](/images/speedcurve/project-listing.png)
    
2.  Name the site appropriately (PWA for PWA, Baseline if we are testing prior to building a PWA), then add the following URL Types:
    
    - Home page, labeled `0 Cache Warming`
        
    - Home page, labeled `1 Home`
        
    - PLP page, labeled `2 PLP`
        
    - PDP Page, labeled `3 PDP`
        
    - PLP Page, labeled `4 PLP to PDP`
        
    - PDP page, labeled `5 PLP to Legacy`  
    
    The page will look like this (But you aren’t done!)  
        
    ![domains](/images/speedcurve/project-setup.png)
        
3.  For each of the steps created, we will need to add a custom WPT script to perform some actions, example:  
    
    ![](attachments/118817035/script-example.png)
    
4.  The following scripts are examples from Carbon38 - you can use the entire [WPT scripting language](https://support.speedcurve.com/en/articles/74065-adding-webpagetest-scripts-to-urls) to perform a test, but the idea is to mimic a browse flow covering the 5 items we created. For Carbon38, they have perimeter-x enabled which requires a special header to avoid getting a captcha with tools like this, you’ll see that `setHeader` in these examples, each site may have specific requirements like this:
    
    - `0 Cache Warming`
    
        Navigate to the home page, PLP, PDP and back again to ensure the pages are cached for subsequent tests
        
        ```
        setHeader	x-px-access-token: SECRETACCESSTOKEN
        navigate	https://www.carbon38.com
        navigate	https://www.carbon38.com/shop-all-activewear/tops/t-shirts
        navigate	https://www.carbon38.com/product/lightweight-crew-neck-tee-white
        navigate	https://www.carbon38.com
        navigate	https://www.carbon38.com/shop-all-activewear/tops/t-shirts
        navigate	https://www.carbon38.com/product/lightweight-crew-neck-tee-white
        ```
        
    - `1 Home`
    
        Block BounceX analytics then navigate to the homepage
        
        ```
        blockDomains	tag.bounceexchange.com
        sleep	30
        setHeader	x-px-access-token: SECRETACCESSTOKEN
        navigate	https://www.carbon38.com
        ```
        
    - `2 PLP`
    
        Block BounceX analytics then navigate to a PLP
        
        ```
        blockDomains	tag.bounceexchange.com
        sleep	30
        setHeader	x-px-access-token: SECRETACCESSTOKEN
        navigate	https://www.carbon38.com/shop-all-activewear/tops/t-shirts
        ```
        
    - `3 PDP`
    
        Block BounceX analytics then navigate to a PDP
        
        ```
        blockDomains	tag.bounceexchange.com
        sleep	30
        setHeader	x-px-access-token: SECRETACCESSTOKEN
        navigate	https://www.carbon38.com/product/lightweight-crew-neck-tee-white
        ```
        
    - `4 PLP to PDP`
    
        Block BounceX analytics, navigate to the PLP, then select an element on that page to navigate to the PDP

        ```        
        blockDomains	tag.bounceexchange.com
        sleep	30
        setHeader	x-px-access-token: SECRETACCESSTOKEN
        logData	0
        navigate	https://www.carbon38.com/shop-all-activewear/tops/t-shirts
        logData	1
        setHeader	x-px-access-token: SECRETACCESSTOKEN
        execAndWait	document.querySelector('a\[href\*="lightweight-crew-neck-tee-white').click()
        ```
        
    - `5 PLP to Legacy`
    
        Block BounceX, navigate to the PLP, then select an element that directs to a legacy page
        
        ```
        blockDomains	tag.bounceexchange.com
        logData	0
        setHeader	x-px-access-token: SECRETACCESSTOKEN
        sleep	30
        navigate	https://www.carbon38.com/shop-all-activewear/tops/t-shirts
        setHeader	x-px-access-token: SECRETACCESSTOKEN
        logData	1
        execAndWait	document.querySelector('a\[href\*="/checkout/cart"').click()
        ```