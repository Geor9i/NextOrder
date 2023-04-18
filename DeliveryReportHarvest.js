function reportHarvest (data) {

    const productUsage = require('./productUsage')

    let productPattern = /(?<productCode>\d{4,})\t(?<product>[\w\s\(\)\-:&+\/"\.]{5,40})\t(?<case>CASE-\s*[\dxX\.kgKGL]+\s*\w*|[-\d\.kgKG]+|BT\s-\s[\d\.]+L*)\t\n\d+\n\n\d+\.\d+\t\n(?<productPrice>\d+\.\d+)\n\t\n(?<previousOrderQuantity>\-*\d{1,3}\.*\d*)\s\((?<previousOrderQuantityDay>\d{2})\s(?<previousOrderQuantityMonth>\w{3})\s(?<previousOrderQuantityYear>\d{4})\)\s*[*]*\n\d{2}\s\w{3}\s\d{4}(?:\s\*\n|\n)(?<previousWeeksUsage>\-*\d+\.*\d*)(?:\s\*\n|\n)(?<onHand>\-*\d+\.*\d*)(?:\s\*\n|\n)\-*\d+\.*\d*(?:\s\*)*/g



    let products = {};

    
    for (let report of data) {

        // Match products for report
        let match;
        while ((match = productPattern.exec(report))!== null) {
            if (!products.hasOwnProperty(match.groups.product)) {

                // console.log(match[2]);
                //Check if product exists in productUsage database!
                //if it does update its safeQuantity!

                let safeQuantity = 0;
                let sustainAmount = 0;
                let isBreak = false;
                for (let group in productUsage) {
                    if (isBreak) {
                        break;
                    }
                    for (let product in productUsage[group]) {
                            let splitter = /\W+/;
                            let nameMatch = product.split(splitter);
                            let matchCheck = nameMatch.filter(el => match.groups.product.includes(el));
                            if (matchCheck.length === nameMatch.length) {
                                safeQuantity = productUsage[group][product].safeQuantity;
                                if (productUsage[group][product].hasOwnProperty("sustainAmount")) {
                                    sustainAmount = productUsage[group][product].sustainAmount;
                                }
                                delete productUsage[group][product];
                                isBreak = true;
                                break;
                            }
                    }
                    }

                products[match.groups.product] = {
                    case: match.groups.case,
                    price: Number(match.groups.productPrice),
                    previousOrderQuantity: Number(match.groups.previousOrderQuantity),
                    previousOrderDate: `${match.groups.previousOrderQuantityYear}/${match.groups.previousOrderQuantityMonth}/${match.groups.previousOrderQuantityDay}`,
                    previousWeeksUsage: Number(match.groups.previousWeeksUsage),
                    safeQuantity: safeQuantity,
                    sustainAmount: sustainAmount,
                    onHand: Number(match.groups.onHand)
                }
            }
            // console.log(match.groups.product);
        }

    }

   

    module.exports = products;

}


reportHarvest ([`
	
powered by MacromatiX	Georgi Urumov - 129768
Session: 35 mins remaining

KFC UK Web Site		
Log Off
StoresStore Admin
Ordering
Store	
FARNBOROUGH - VICTORIA RD - 11037
select

New Order
Header
Detail
Receive
Step 1 - New Order
Select order type below, then set the parameters for creating one or more orders based on rules or predefined criteria. The actual order(s) will be created from this new order outline and will then be sent to the vendor.
Type	
Projected Order
select
Supplier	
1-BEST FOOD LOGISTICS
select
Blanket Order #	
SCHEDULED DELIVERY DATE	
21-Apr-2023 09:36 AM
Open the calendar popup.
Order to cover	
1
 Days

Step 2 - Unprocessed New Orders
PDF
select
New Orders	
2731048 - 18-Apr-2023
select
Date Ordered	
18-Apr-2023
Status	
Unprocessed
 #:	
2731048
Supplier	
1-BEST FOOD LOGISTICS
ID#:	
24
Items in this order
Show:	Current Inventory	Previous Week's Usage	Last Order Detail	Inventory Units	 	
Item Code	Description	Purchase Unit	Quantity	Original
Quantity	Price		Taxable	Last Order
Qty (Date)	Prev Week
Ending	Prev Week
Usage	Current
On Hand	Current
On Order
1-BEST FOOD LOGISTICS (0) (£0.00)		
28234	CHICKEN ORIGINAL	CASE-180	
0

0.00	
57.0900
	
7 (17 Apr 2023) *
16 Apr 2023 *
21.09 *
4.80 *
92.00 *
74524	PEPPER MAYO (FR)	CASE-18KG	
0

0.00	
39.5800
	
1 (07 Apr 2023) *
16 Apr 2023 *
0.18 *
1.60 *
2.00 *
74523	SAUCE BURGER DRESSING (FR)	CASE-18.48KG	
0

0.00	
35.5700
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.53 *
0.47 *
4.00 *
71268	SALAD ICEBERG	CASE-4KG	
0

0.00	
10.9900
	
1 (17 Apr 2023) *
16 Apr 2023 *
3.51 *
1.79 *
13.00 *
71007	TOMATO CHOPPED	CASE-4KG	
0

0.00	
12.3900
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.70 *
0.76 *
8.00 *
74228	LETTUCE APOLLO MIX	CASE-4x250g	
0

0.00	
6.0600
	
1 (14 Apr 2023)
16 Apr 2023
1.40
2.74
12.00
76173	COLESLAW REGULAR	CASE-36	
0

0.00	
11.3500
	
1 (17 Apr 2023) *
16 Apr 2023 *
2.56 *
1.25 *
13.00 *
76174	COLESLAW LARGE	CASE-36	
0

0.00	
15.3700
	
1 (12 Apr 2023) *
16 Apr 2023 *
1.64 *
1.47 *
12.00 *
75749	CHEESE SLICE	CASE-1008	
0

0.00	
76.0900
	
1 (07 Apr 2023) *
16 Apr 2023 *
0.41 *
1.08 *
2.00 *
71243	WHITE CHOCLATE PIECES (Milkybar)	CASE- 8x400g	
0

0.00	
25.6600
	
1 (20 Mar 2023)
16 Apr 2023
0.09
0.37
2.00
76170	MILK FRESH	CASE-6x1Ltr	
0

0.00	
12.1100
	
1 (14 Apr 2023) *
16 Apr 2023 *
0.22 *
3.00 *
12.00 *
75831	PICKLED SLAW	CASE-2KG	
0

0.00	
6.9000
	
1 (17 Apr 2023)
16 Apr 2023
6.12
3.54
10.00
76019	PINEAPPLE STICK	CASE-100	
0

0.00	
53.1900
	
1 (10 Apr 2023) *
16 Apr 2023 *
0.38 *
1.09 *
0.00 *
76097	CHICKEN OR (DARK MEAT 14:4)	CASE-180	
0

0.00	
57.0900
	
1 (12 Dec 2017) *
16 Apr 2023 *
0.00 *
0.00 *
5.00 *
76166	BEANS LARGE PREPOTTED	CASE-48	
0

0.00	
29.7500
	
1 (17 Apr 2023) *
16 Apr 2023 *
1.73 *
1.13 *
1.00 *
76167	BEANS REGULAR PREPOTTED	CASE-64	
0

0.00	
22.4800
	
2 (17 Apr 2023) *
16 Apr 2023 *
2.97 *
0.72 *
2.00 *
74417	HENNY PENNY FILTERS (200)	CASE-200	
0

0.00	
54.0600
	
1 (04 Nov 2022) *
09 Apr 2023 *
0.00 *
0.91 *
0.00 *
76112	LABELS SMALL (Sato and Avery)	CASE-48x1700	
0

0.00	
49.4900
	
1 (06 Feb 2023) *
02 Apr 2023 *
0.00 *
1.50 *
0.00 *
76132	BAG FOOD DONATION	CASE-1000	
0

0.00	
143.1500
	
02 Apr 2023 *
0.00 *
1.00 *
0.00 *
75796	MILK & EGG MIX (FR)	CASE-13.6KG	
0

0.00	
62.9200
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.23 *
0.28 *
2.00 *
76047	SEASONING 3 STEP (2021 Recipe)	CASE-11.1KG	
0

0.00	
89.4900
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.62 *
0.61 *
2.00 *
50602	FLOUR 3 STEP	11.34kg	
0

0.00	
8.6400
	
4 (17 Apr 2023)
16 Apr 2023
16.59
9.62
71.00
75770	ICE CREAM MIX LS	CASE-12KG	
0

0.00	
22.1300
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.62 *
0.65 *
6.00 *
75797	SAUCE HOT SALSA SMOOTH	CASE-6x1.073kg	
0

0.00	
18.7400
	
1 (03 Apr 2023) *
16 Apr 2023 *
0.22 *
0.59 *
0.00 *
70718	SALT SACHETS	CASE-10000	
0

0.00	
14.2200
	
1 (10 Apr 2023) *
16 Apr 2023 *
0.33 *
0.39 *
1.00 *
76126	SALT SACHETS 5000 (Contingency)	CASE-5000	
0

0.00	
14.8400
	
*
*
*
*
*
75636	BREADING HOT&SPICY	CASE-60x198g	
0

0.00	
31.4200
	
1 (22 Dec 2022) *
16 Apr 2023 *
0.12 *
0.36 *
0.00 *
71242	BREADING SALT	CASE- 15.288kg	
0

0.00	
12.4000
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.71 *
0.50 *
2.00 *
76063	MILK MILLAC MAID (MILK POT)	CASE-480	
0

0.00	
10.8800
	
1 (07 Dec 2022) *
16 Apr 2023 *
0.00 *
0.75 *
0.00 *
75765	SACHET BBQ SAUCE(1500)	CASE-1500	
0

0.00	
35.9100
	
1 (13 Mar 2023) *
16 Apr 2023 *
0.49 *
1.01 *
0.00 *
75982	SACHET BBQ SAUCE	CASE-250	
0

0.00	
6.6700
	
*
*
*
*
*
75800	SAUCE SUPERCHARGER	CASE-6	
0

0.00	
21.3400
	
1 (07 Apr 2023) *
16 Apr 2023 *
0.44 *
0.93 *
2.00 *
71244	MILK CARNATION CONDENSED	CASE-12x450g	
0

0.00	
32.0500
	
1 (13 Mar 2023)
16 Apr 2023
0.08
0.57
0.00
74226	SAUCE DADDIES (KETCHUP)	CASE-6x1.35KG	
0

0.00	
10.3800
	
1 (10 Mar 2023) *
16 Apr 2023 *
0.22 *
0.47 *
2.00 *
74245	BEAN SALSA	CASE-6x1.178kg	
0

0.00	
22.3300
	
1 (17 Apr 2023)
16 Apr 2023
0.13
0.23
3.00
75981	SUGAR STICKS (5000)	CASE-5000	
0

0.00	
24.5800
	
1 (13 Mar 2023) *
16 Apr 2023 *
0.00 *
1.10 *
0.00 *
74276	SACHET TOMATO KETCHUP	CASE-1500	
0

0.00	
23.9900
	
1 (20 Mar 2023) *
16 Apr 2023 *
0.98 *
0.31 *
3.00 *
74277	SACHET LIGHT MAYONNAISE	CASE-1100	
0

0.00	
35.8200
	
1 (20 Mar 2023) *
16 Apr 2023 *
0.67 *
0.62 *
4.00 *
76151	SACHET LIGHT MAYONNAISE CONTINGENCY	CASE-200	
0

0.00	
8.4700
	
*
*
*
*
*
76146	SAUCE CHOCOLATE (KRUSHEMS + SUNDAE)	CASE-6KG	
0

0.00	
34.8800
	
1 (22 Mar 2023) *
16 Apr 2023 *
0.11 *
0.23 *
0.00 *
74501	GRAVY 3 STEP (2016)	CASE-50	
0

0.00	
48.0500
	
1 (05 Apr 2023)
16 Apr 2023
0.59
0.74
1.00
76018	DIP GARLIC MAYO	CASE-200	
0

0.00	
28.5500
	
1 (17 Apr 2023) *
16 Apr 2023 *
1.09 *
1.31 *
5.60 *
76016	DIP SMOKY BBQ	CASE-200	
0

0.00	
28.0200
	
1 (12 Apr 2023) *
16 Apr 2023 *
1.17 *
1.08 *
3.60 *
76017	DIP SWEET CHILLI	CASE-200	
0

0.00	
28.6600
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.78 *
0.75 *
1.80 *
76015	DIP TOMATO SAUCE	CASE-200	
0

0.00	
27.5100
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.10 *
0.90 *
3.80 *
76128	SWEETCORN	CASE-12x340g	
0

0.00	
9.8100
	
1 (07 Apr 2023) *
16 Apr 2023 *
0.68 *
0.86 *
5.00 *
75673	TOPPING OREO CRUMB	CASE-12x400g	
0

0.00	
20.7600
	
1 (08 Mar 2023) *
16 Apr 2023 *
0.14 *
0.23 *
3.14 *
75997	SAUCE KANSAS BBQ (BITES)	CASE-6X1.206KG	
0

0.00	
20.0800
	
1 (07 Apr 2023) *
16 Apr 2023 *
0.63 *
2.37 *
0.00 *
75766	SAUCE BBQ SMOKEY(Twister)	CASE-6	
0

0.00	
17.2900
	
1 (20 Mar 2023) *
16 Apr 2023 *
0.35 *
2.08 *
2.00 *
75803	COFFEE BEAN (KB)	CASE-10KG	
0

0.00	
69.3400
	
1 (08 Feb 2023) *
16 Apr 2023 *
0.01 *
0.45 *
1.00 *
75809	CHOCOLATE POWDER SBC	CASE-10x1kg	
0

0.00	
43.0300
	
1 (29 Dec 2022) *
16 Apr 2023 *
0.00 *
0.20 *
0.00 *
75810	SAUCE BUTTERMILK DRESSING	CASE-6	
0

0.00	
21.8500
	
1 (07 Apr 2023) *
16 Apr 2023 *
0.22 *
0.67 *
1.00 *
75811	SAUCE SWEET CHILLI (Stacker)	CASE-6	
0

0.00	
20.5800
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.24 *
0.44 *
2.00 *
75866	SAUCE SWEET CHILLI (BITES)	CASE-6x1.13KG	
0

0.00	
20.6000
	
1 (07 Apr 2023)
16 Apr 2023
0.56
1.37
1.00
75890	SAUCE VEGAN MAYO	CASE-4x975g	
0

0.00	
15.2600
	
1 (31 Mar 2023)
16 Apr 2023
0.07
1.00
0.00
76014	DIP SUPERCHARGER	CASE-200	
0

0.00	
32.0100
	
1 (17 Apr 2023) *
16 Apr 2023 *
1.04 *
1.00 *
4.00 *
76145	AERO CHOC PIECES	CASE-4KG	
0

0.00	
39.4300
	
1 (05 Dec 2022) *
16 Apr 2023 *
0.02 *
0.74 *
0.00 *
76169	SAUCE BUFFALO (TWISTER)	CASE-4x1kg	
0

0.00	
15.7500
	
1 (20 Mar 2023) *
16 Apr 2023 *
0.18 *
0.83 *
0.00 *
75837	STRAWS PAPER (6mm)	CASE-5000	
0

0.00	
40.8500
	
1 (02 Nov 2022) *
16 Apr 2023 *
0.09 *
0.64 *
0.00 *
74321	LID HOT CUP (LID KFC EMBOSSED )	CASE-1000	
0

0.00	
19.9100
	
1 (17 Feb 2023) *
16 Apr 2023 *
0.01 *
1.00 *
0.00 *
75879	CARRIER 2 CUP	CASE-580	
0

0.00	
22.9300
	
1 (31 Mar 2023) *
16 Apr 2023 *
0.35 *
1.24 *
0.93 *
74473	CARRIER 4 CUP (400)	CASE-400	
0

0.00	
32.1600
	
1 (03 Mar 2023) *
16 Apr 2023 *
0.51 *
0.32 *
1.00 *
70188	CUP 16OZ	CASE-1000	
0

0.00	
39.3500
	
1 (31 Mar 2023) *
16 Apr 2023 *
0.37 *
0.33 *
1.00 *
29879	BUCKET & LID 130oz	CASE-125	
0

0.00	
30.5800
	
1 (12 Apr 2023) *
16 Apr 2023 *
0.62 *
1.95 *
1.00 *
75980	NAPKINS (8000)	CASE-8000	
0

0.00	
35.3300
	
1 (10 Mar 2023) *
16 Apr 2023 *
0.86 *
0.70 *
0.75 *
50577	BAG FILLET PLASTIC	CASE-2000	
0

0.00	
28.8100
	
1 (10 Mar 2023)
16 Apr 2023
0.00
1.50
0.00
76148	SPOON WOODEN 16CM	CASE-1000	
0

0.00	
12.8000
	
1 (05 Dec 2022) *
16 Apr 2023 *
0.87 *
0.61 *
0.00 *
70187	CUP 22OZ	CASE-1000	
0

0.00	
45.0400
	
1 (26 Jan 2023) *
16 Apr 2023 *
0.05 *
0.20 *
0.00 *
70255	BOX POPCORN REG	CASE-500	
0

0.00	
18.0600
	
1 (03 Apr 2023) *
16 Apr 2023 *
0.20 *
0.77 *
1.00 *
70256	BOX POPCORN LARGE	CASE-500	
0

0.00	
20.8100
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.49 *
0.50 *
2.00 *
70480	BOX POPCORN SMALL	CASE-1500	
0

0.00	
41.5900
	
1 (03 Apr 2023) *
16 Apr 2023 *
0.21 *
0.96 *
0.00 *
70547	WETNAPS	CASE-6000	
0

0.00	
36.1200
	
1 (22 Mar 2023) *
16 Apr 2023 *
0.61 *
0.78 *
2.00 *
76176	WRAP TWISTER BUFFALO	CASE-500	
0

0.00	
30.3600
	
1 (12 Apr 2023) *
16 Apr 2023 *
0.42 *
1.75 *
0.00 *
70737	CLAMSHELL BANQUET	CASE-500	
0

0.00	
19.4100
	
1 (14 Apr 2023) *
16 Apr 2023 *
0.48 *
1.42 *
2.00 *
76066	PLATE - BOAT TRAY	CASE-1200	
0

0.00	
46.0800
	
0.9375 (28 Apr 2021) *
16 Apr 2023 *
0.09 *
-0.02 *
0.94 *
76106	PLATE - BOAT TRAY	CASE-1000	
0

0.00	
38.8000
	
*
*
*
*
*
70800	LID 12/16/22OZ	CASE-2000	
0

0.00	
27.7900
	
1 (05 Apr 2023) *
16 Apr 2023 *
0.21 *
1.06 *
3.00 *
70858	BAG CORN COBETTE	CASE-3000	
0

0.00	
16.2600
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.11 *
1.08 *
1.00 *
75836	BAG CORN COBETTE	CASE-3000	
0

0.00	
20.7200
	
*
*
*
*
*
70861	BAG BROWN PAPER	CASE-1000	
0

0.00	
29.8900
	
1 (17 Apr 2023) *
16 Apr 2023 *
4.68 *
-0.24 *
4.00 *
76049	BAG CHICKEN SMALL (OR)	CASE-2000	
0

0.00	
51.8300
	
1 (20 Mar 2023) *
16 Apr 2023 *
0.30 *
0.84 *
1.00 *
74229	BAG CHICKEN LARGE	CASE-1800	
0

0.00	
55.9200
	
1 (03 Mar 2023) *
16 Apr 2023 *
0.12 *
0.88 *
2.00 *
76168	STRAWS JUMBO KRUSHEM	CASE-1400	
0

0.00	
19.2600
	
1 (06 Feb 2023) *
16 Apr 2023 *
0.04 *
1.42 *
0.00 *
76004	BUCKET SNACKBOX	CASE-440	
0

0.00	
60.0600
	
1 (20 Mar 2023) *
16 Apr 2023 *
0.12 *
0.88 *
0.00 *
75852	CUP KRUSHEMS (2019)	CASE-800	
0

0.00	
41.1100
	
1 (12 Apr 2023) *
16 Apr 2023 *
0.08 *
1.24 *
0.00 *
76072	POT SIDE LARGE (2021)	CASE-1240	
0

0.00	
54.9300
	
1 (12 Apr 2023) *
16 Apr 2023 *
0.22 *
1.45 *
1.00 *
75889	LID SIDE LARGE (RED)	CASE-1152	
0

0.00	
26.8900
	
1 (17 Mar 2023) *
16 Apr 2023 *
0.31 *
0.53 *
3.00 *
76073	POT SIDE SMALL (2021)	CASE-2400	
0

0.00	
56.0600
	
1 (05 Apr 2023) *
16 Apr 2023 *
0.17 *
1.26 *
1.05 *
75888	LID SIDE SMALL (RED)	CASE-2400	
0

0.00	
28.3600
	
1 (07 Apr 2023) *
16 Apr 2023 *
0.25 *
1.35 *
0.00 *
76157	BAG CARRIER LARGE	CASE-250	
0

0.00	
22.8300
	
2 (17 Apr 2023) *
16 Apr 2023 *
3.35 *
1.33 *
19.40 *
76172	DELIVERY LABELS(World Cup)	CASE-3520	
0

0.00	
30.0800
	
1 (07 Apr 2023) *
16 Apr 2023 *
0.00 *
5.97 *
0.00 *
74575	BUCKET & LID MIGHTY	CASE-252	
0

0.00	
35.2200
	
1 (07 Apr 2023) *
16 Apr 2023 *
1.10 *
0.08 *
4.05 *
74200	BUCKET & LID 85OZ	CASE-200	
0

0.00	
36.9300
	
1 (12 Apr 2023) *
16 Apr 2023 *
1.38 *
1.68 *
6.00 *
76108	BUCKET & LID 85OZ (Contingency)	CASE-390	
0

0.00	
83.0900
	
*
*
*
*
*
74230	BAG FRIES (GENERIC) 8 x 8	CASE- 4000	
0

0.00	
34.9300
	
1 (15 Mar 2023) *
16 Apr 2023 *
0.21 *
0.45 *
1.00 *
75928	BOX 6 IN 1	CASE-300	
0

0.00	
43.0500
	
1 (14 Apr 2023) *
16 Apr 2023 *
2.12 *
2.62 *
11.33 *
74342	STIRRERS WOODEN 7.5"	CASE-5000	
0

0.00	
14.6200
	
1 (11 Apr 2022) *
16 Apr 2023 *
0.00 *
0.30 *
0.00 *
76043	WRAP STREETWISE (Mini Sleeve)	CASE-600	
0

0.00	
28.5000
	
1 (20 Mar 2023) *
16 Apr 2023 *
0.29 *
0.36 *
5.83 *
75926	CLAMSHELL CLASSIC 2020	CASE-900	
0

0.00	
34.4700
	
1 (14 Apr 2023) *
16 Apr 2023 *
0.49 *
1.34 *
3.56 *
76177	TRAYLINER	CASE-1600	
0

0.00	
17.1800
	
1 (21 Aug 2019) *
16 Apr 2023 *
0.08 *
1.97 *
0.00 *
76165	BOX MEGABOX (2 Tabs)	CASE-350	
0

0.00	
24.7000
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.10 *
0.18 *
3.00 *
75637	BOX RICEBOX (2017)	CASE-200	
0

0.00	
37.9300
	
1 (03 Apr 2023) *
16 Apr 2023 *
0.22 *
0.84 *
1.00 *
75976	CORN SKEWERS	CASE-2000	
0

0.00	
9.1700
	
1 (07 Apr 2023) *
16 Apr 2023 *
0.17 *
1.16 *
3.50 *
75777	SCOOP FRIES LARGE (11X11 Fries)	CASE-1300	
0

0.00	
30.2900
	
1 (24 Dec 2022) *
16 Apr 2023 *
0.07 *
0.69 *
0.00 *
75935	CLAMSHELL FRIES (Delivery Only)	CASE-960	
0

0.00	
35.0000
	
1 (14 Apr 2023) *
16 Apr 2023 *
3.75 *
1.21 *
1.00 *
75793	BAG FRIES REG (11x11 FRIES)	CASE-5000	
0

0.00	
25.7800
	
1 (31 Mar 2023) *
16 Apr 2023 *
0.57 *
0.69 *
0.00 *
75927	CLAMSHELL STACKER & TOWER 2020	CASE-400	
0

0.00	
26.0100
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.68 *
0.34 *
1.00 *
75833	CUP 12oz COFFEE	CASE-600	
0

0.00	
41.1100
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.01 *
0.17 *
0.00 *
75858	POT SIDE CARD (Rice / Salad)	CASE-1000	
0

0.00	
61.1100
	
1 (20 Mar 2023) *
16 Apr 2023 *
0.21 *
1.15 *
1.00 *
75860	LID CARD (Rice / Salad)	CASE-1000	
0

0.00	
34.7600
	
1 (15 Mar 2023) *
16 Apr 2023 *
0.21 *
0.25 *
1.00 *
75881	LID CARD CONTINGENCY (Rice / Salad)	CASE-1000	
0

0.00	
34.7200
	
*
*
*
*
*
75934	CLAMSHELL VEGAN (KRAFT)	CASE-300	
0

0.00	
16.9200
	
1 (07 Jul 2022) *
16 Apr 2023 *
0.06 *
0.21 *
0.00 *
76178	BUCKET KIDS MERLIN	CASE-180	
0

0.00	
50.3000
	
1 (05 Apr 2023) *
16 Apr 2023 *
0.19 *
1.39 *
0.00 *
76034	CUP SOUTHERN REFRESHER	CASE-960	
0

0.00	
66.7600
	
0.625 (10 May 2021) *
16 Apr 2023 *
0.00 *
1.20 *
0.00 *
76042	CLAMSHELL MINI FILLET BURGER	CASE-400	
0

0.00	
16.1600
	
1 (12 Apr 2023) *
16 Apr 2023 *
0.41 *
1.27 *
1.00 *
76048	BAG CHICKEN SMALL (H/W)	CASE-2000	
0

0.00	
51.8300
	
1 (28 Nov 2022) *
16 Apr 2023 *
0.36 *
-0.06 *
0.00 *
76131	LID SIPPY	CASE-2112	
0

0.00	
36.9600
	
1 (22 Dec 2022) *
16 Apr 2023 *
0.00 *
1.40 *
0.00 *
76113	WRAP KIDS	CASE-1000	
0

0.00	
13.9900
	
1 (22 Feb 2023)
16 Apr 2023
0.01
1.00
0.00
76147	FORK WOODEN 16CM	CASE-1000	
0

0.00	
12.0900
	
1 (31 Mar 2023) *
16 Apr 2023 *
0.52 *
-0.12 *
0.00 *
70578	HASH BROWN	CASE-250	
0

0.00	
18.3800
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.92 *
0.78 *
7.00 *
60011	CORN COBETTES	CASE-96	
0

0.00	
16.7100
	
1 (17 Apr 2023)
16 Apr 2023
3.57
2.71
21.00
76155	BUN MINI FILLET	CASE-108	
0

0.00	
12.3300
	
1 (17 Apr 2023) *
16 Apr 2023 *
1.65 *
0.49 *
10.00 *
74599	CHICKEN HOTWINGS ISP (60X6)	CASE-360	
0

0.00	
41.0400
	
4 (17 Apr 2023) *
16 Apr 2023 *
14.40 *
5.39 *
51.27 *
76061	CHICKEN POPCORN (2021 Recipe)	CASE-2072	
0

0.00	
65.7200
	
3 (17 Apr 2023) *
16 Apr 2023 *
6.72 *
2.14 *
26.00 *
70865	CHICKEN FROZEN	CASE-12	
0

0.00	
44.9500
	
2 (24 Jan 2023) *
16 Apr 2023 *
0.00 *
6.00 *
0.00 *
70961	TORTILLA 20cm PLAIN	CASE-144	
0

0.00	
11.4600
	
1 (14 Apr 2023) *
16 Apr 2023 *
1.20 *
2.08 *
5.00 *
75883	COOKIE CHOCOLATE CHUNK	CASE-115	
0

0.00	
35.5300
	
1 (05 Apr 2023) *
16 Apr 2023 *
0.50 *
0.61 *
0.00 *
74250	CHICKEN ZINGER ISP	CASE-120	
0

0.00	
62.9300
	
1 (17 Apr 2023) *
16 Apr 2023 *
3.87 *
3.67 *
14.00 *
74256	CHICKEN FILLETS	CASE-120	
0

0.00	
66.5500
	
1 (17 Apr 2023) *
16 Apr 2023 *
4.76 *
3.00 *
13.00 *
74257	CHICKEN MINI FILLET	CASE-240	
0

0.00	
64.4800
	
5 (17 Apr 2023) *
16 Apr 2023 *
12.86 *
3.67 *
55.00 *
74326	RICE SPICEY	CASE-36X4	
0

0.00	
24.9700
	
1 (14 Apr 2023) *
16 Apr 2023 *
1.22 *
1.92 *
4.00 *
76154	BUN GLAZED	CASE-108	
0

0.00	
14.2700
	
2 (17 Apr 2023) *
16 Apr 2023 *
6.81 *
2.79 *
27.00 *
75886	COOKIE WHITE CHOC	CASE-115	
0

0.00	
37.7200
	
1 (12 Apr 2023) *
16 Apr 2023 *
0.16 *
1.17 *
3.00 *
75782	FRIES 11X11	CASE-10x1.5kg	
0

0.00	
17.8700
	
4 (17 Apr 2023) *
16 Apr 2023 *
31.15 *
20.00 *
94.00 *
75835	TORTILLA 25.4cm (4 Flavour Twister)	CASE-192	
0

0.00	
20.1300
	
1 (14 Apr 2023) *
16 Apr 2023 *
1.09 *
1.58 *
0.00 *
75871	VEGAN FILLET	CASE-120	
0

0.00	
79.6100
	
1 (05 Apr 2023)
16 Apr 2023
0.16
0.95
1.00
75931	CHICKEN OR FILLET BITES FTF	CASE-476	
0

0.00	
70.6700
	
1 (12 Apr 2023) *
16 Apr 2023 *
1.18 *
1.29 *
5.00 *
76152	MASHED POTATOES	CASE-893	
0

0.00	
16.8000
	
1 (14 Apr 2023) *
16 Apr 2023 *
1.00 *
1.46 *
5.43 *
76137	TOILET ROLLS	CASE-36	
0

0.00	
7.6400
	
1 (15 Mar 2023) *
02 Apr 2023 *
0.00 *
1.00 *
0.00 *
74296	TOWELS BLUE Z FOLD	CASE-400	
0

0.00	
17.5900
	
1 (17 Apr 2023) *
09 Apr 2023 *
0.00 *
4.00 *
3.00 *
74297	BLUE ROLL 1 PLY 400M	CASE-6	
0

0.00	
14.1200
	
1 (17 Apr 2023) *
16 Apr 2023 *
0.00 *
10.00 *
7.00 *
75948	CLEAR REFUSE SACK	CASE-350	
0

0.00	
31.5800
	
1 (01 Mar 2023) *
02 Apr 2023 *
0.00 *
2.00 *
1.00 *
74368	DISHWASH SOAP (SUMA STAR D1)	CASE-10L	
0

0.00	
8.2700
	
1 (07 Apr 2023) *
16 Apr 2023 *
0.00 *
8.00 *
1.00 *
76007	RESTROOM CLEANER (SANI 4 IN 1)	BT - 1.4L	
0

0.00	
21.4300
	
1 (03 Apr 2023) *
09 Apr 2023 *
0.00 *
3.50 *
0.00 *
74404	GLASS/SURFACE CLEANER (TASKI)	CASE-1	
0

0.00	
14.9800
	
1 (24 Jul 2015)
02 Apr 2023
0.00
1.00
0.00
76013	BUN T RELEASE (TRIGGER - SUMA)	CASE-6	
0

0.00	
22.9800
	
1 (10 Mar 2023) *
02 Apr 2023 *
0.00 *
2.00 *
0.00 *
74406	SANITISER (SUMA)	CASE-1	
0

0.00	
29.5800
	
1 (09 Dec 2022)
02 Apr 2023
0.00
6.00
0.00
75622	DELIMER (SUMA)	CASE-25	
0

0.00	
10.6300
	
1 (01 Nov 2019) *
02 Apr 2023 *
0.00 *
0.00 *
0.00 *
74409	DEGREASER (SUMA)	CASE-1x10L	
0

0.00	
18.9300
	
1 (20 Mar 2023)
02 Apr 2023
0.00
1.00
0.00
75924	GRILL CLEANER (SUMA)	CASE-6 BOTTLES	
0

0.00	
18.1800
	
1 (10 Mar 2023) *
02 Apr 2023 *
0.00 *
2.45 *
2.04 *
75922	SANITISER TABLETS (TITAN CHLOR)	CASE-1200	
0

0.00	
33.0100
	
1 (12 Dec 2022) *
02 Apr 2023 *
0.00 *
1.67 *
1.00 *
74532	STAINLESS STEEEL POLISH (SUMA INOX D7.1)	CASE-6x750ml	
0

0.00	
17.2800
	
1 (23 Oct 2018)
02 Apr 2023
0.00
1.00
0.00
74559	SANITISING GEL (Soft Care Des E)	CASE-2	
0

0.00	
20.6400
	
1 (20 Jan 2023) *
02 Apr 2023 *
0.00 *
11.00 *
0.00 *
74564	CARE TABLETS	CASE-150	
0

0.00	
42.6800
	
1 (12 Apr 2021) *
02 Apr 2023 *
0.00 *
2.00 *
0.00 *
74565	DETERGENT TABLETS	CASE-100	
0

0.00	
34.7500
	
1 (21 Oct 2022) *
02 Apr 2023 *
0.00 *
0.50 *
0.00 *
75954	VINYL GLOVE M	CASE-1000	
0

0.00	
23.6900
	
1 (10 Mar 2023) *
16 Apr 2023 *
0.00 *
1.00 *
0.00 *
75955	VINYL GLOVE L	CASE-1000	
0

0.00	
23.6900
	
*
*
*
*
*
76103	DISPOSABLE GLOVES	CASE-1000	
0

0.00	
11.4900
	
*
*
*
*
*
75957	FACE MASK (Do Not Order)	CASE-50	
0

0.00	
6.1300
	
1 (10 Mar 2023) *
16 Apr 2023 *
0.00 *
1.00 *
5.00 *
75970	FACE MASK (ORDER)	CASE-1x50	
0

0.00	
6.1000
	
*
*
*
*
*
76020	SPRINT FLOWER	CASE-1.5L	
0

0.00	
22.3000
	
1 (03 Feb 2023)
16 Apr 2023
0.00
2.00
0.00
75747	OIL VEGETABLE BOX	CASE-20	
0

0.00	
33.2300
	
1 (09 Jan 2023) *
16 Apr 2023 *
0.00 *
0.00 *
18.00 *
75748	OIL PREMIUM PRESSURE FRYER	CASE-20L	
0

0.00	
36.5500
	
3 (17 Apr 2023) *
16 Apr 2023 *
0.00 *
9.00 *
28.00 *
71417	FRUIT SHOOT ORANGE	CASE-24	
0

0.00	
6.3800
	
1 (12 Apr 2023) *
16 Apr 2023 *
0.79 *
0.96 *
3.00 *
71416	FRUIT SHOOT BLK / APL	CASE-24	
0

0.00	
6.3800
	
1 (17 Apr 2023) *
16 Apr 2023 *
2.04 *
1.79 *
6.00 *
74551	CAN TANGO	CASE-24	
0

0.00	
6.2600
	
2 (14 Apr 2023)
16 Apr 2023
9.04
13.92
22.00
74231	TROPICANA ORANGE	CASE-48	
0

0.00	
17.9100
	
1 (12 Apr 2023) *
16 Apr 2023 *
0.92 *
0.90 *
3.00 *
76185	TROPICANA ORANGE	CASE-24	
0

0.00	
13.2600
	
*
*
*
*
*
71403	BTL DIET PEPSI 1.5L	CASE-12	
0

0.00	
7.3100
	
1 (12 Apr 2023) *
16 Apr 2023 *
1.25 *
1.08 *
5.00 *
71419	BTL DIET PEPSI 2L	CASE-8	
0

0.00	
5.6500
	
*
*
*
*
*
71404	BTL PEPSI MAX 1.5L	CASE-12	
0

0.00	
7.3100
	
2 (17 Apr 2023) *
16 Apr 2023 *
9.08 *
5.00 *
20.00 *
71422	BTL PEPSI MAX 2L	CASE-8	
0

0.00	
5.6500
	
*
*
*
*
*
71407	BTL TANGO 1.5L	CASE-12	
0

0.00	
7.3100
	
1 (17 Apr 2023)
16 Apr 2023
3.25
2.50
16.00
74553	CAN PEPSI MAX	CASE-24	
0

0.00	
8.2600
	
4 (17 Apr 2023)
16 Apr 2023
17.75
9.46
37.00
74170	BTL 7UP FREE 1.5L	CASE-12	
0

0.00	
7.2100
	
1 (14 Apr 2023) *
16 Apr 2023 *
2.50 *
2.25 *
7.00 *
74235	WATER SPRINGBOURNE STILL 500ML	CASE-24	
0

0.00	
5.2000
	
2 (17 Apr 2023) *
16 Apr 2023 *
5.71 *
2.46 *
18.00 *
75696	BIB 7UP FREE(HIGH YIELD)	CASE-12	
0

0.00	
22.2800
	
1 (03 Mar 2023) *
16 Apr 2023 *
0.15 *
1.49 *
0.00 *
74464	BIB DIET PEPSI 12LT (HIGH YIELD)	CASE-12	
0

0.00	
22.2800
	
1 (06 Jan 2023) *
16 Apr 2023 *
0.09 *
0.99 *
0.00 *
74465	BIB PEPSI MAX (HIGH YIELD)	CASE-12	
0

0.00	
22.2800
	
1 (07 Apr 2023) *
16 Apr 2023 *
0.73 *
2.87 *
0.00 *
75736	BIB TANGO S-FREE 12L(HIGH YIELD)	CASE-12	
0

0.00	
22.2800
	
1 (20 Mar 2023) *
16 Apr 2023 *
0.26 *
1.44 *
0.00 *
74596	CAN 7UP FREE	CASE-24	
0

0.00	
6.1900
	
2 (12 Apr 2023) *
16 Apr 2023 *
4.71 *
4.42 *
13.00 *
75596	BIB ICE TEA PEACH (LIPTON)	CASE-10L	
0

0.00	
15.9500
	
1 (20 Mar 2023)
16 Apr 2023
0.13
0.98
1.00
75758	BIB ROBINSONS AP & BLKCURRANT	CASE-7L	
0

0.00	
12.9300
	
1 (14 Apr 2023) *
16 Apr 2023 *
0.05 *
1.99 *
0.00 *
75775	BIB PEPSI CHERRY MAX (HY)	CASE-12	
0

0.00	
22.2800
	
1 (06 Jan 2023) *
16 Apr 2023 *
0.10 *
0.98 *
2.00 *
75709	WATER SPARKLING	CASE-24	
0

0.00	
5.3800
	
1 (03 Apr 2023) *
16 Apr 2023 *
0.75 *
1.13 *
2.00 *
75872	BIB WATERMELON LIME	CASE-10	
0

0.00	
30.9400
	
1 (10 Apr 2023) *
16 Apr 2023 *
0.10 *
3.00 *
0.00 *
74359	TILL ROLLS (THERMAL)	CASE-40	
0

0.00	
33.8500
	
1 (26 Jan 2023) *
02 Apr 2023 *
0.00 *
1.40 *
2.00 *

* Multi Order Item

Order Totals
Number of Items	
0
 	Freight	
£0.00
 			 	 	 
Non-Taxable Total	
0.00
 	Tax	
0.00
 	Total	
0.00
 	 	 
Taxable Total	
0.00
 	Discount	
£0.00
Amount Due	
0.00
 	 	 
Blanket Order No	
 	 	 	 		 	 	 	 	 

Step 3 - Process Actual Order(s)
Click the "Process Order" button below to create the actual orders based on the criteria you have specified in this order outline.
Include Zero Order Quantities
Auto Submit
Auto Authorise

Receive for Direct Supplier Delivery ONLY

 

 
      
 






Cash Management
 
Inventory
Stock Count
Waste Record
Orders
Transfers
MP&C
Forecasting
Mobile Forecasting
Recipe Viewer
 
Mobile Forecasting
 
Labour
 
Labour with T&A
 
HotSchedules
 
Reports
 
Menu
Work Flow
`])