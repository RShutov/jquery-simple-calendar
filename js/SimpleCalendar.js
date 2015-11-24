/* Calendar jquery  */

    $.widget( "custom.SimpleCalendar", {
        options: {
         	lang: {
         		weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
         		weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
         		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
         		dateError: "Wrong date",
         	},
         	datePattern: "[0-3][0-9]-((0[1-9])|(1[0-2])){1,1}-((19[0-9]{2,2})|(2[0-9]{3,3})){1,1}",
         	datePlaceholder: "DD-MM-YYYY",
         	MAX_YEAR: 3000,
			MIN_YEAR: 1900,
        },

        _create: function (){
        	$thisWidget = this;
        	this.element.each(
        		function(index, element){
        			$element = $(element);
					$element.append(
						$("<input>").attr({	
							"class": "dateinput",
							"pattern" : $thisWidget.options.datePattern,
							"placeholder": $thisWidget.options.datePlaceholder
						})
					);
					$element.append($("<div>").attr("class", "btnWrapper")
							  .append($("<div>").attr("class", "detailBtn")
							  .click(calendar)));
				});	

        		function calendar(event){
					$this = $(event.currentTarget).parent().parent();
					var $tableMain;
					var $selectedCell;
					var dd;
					var mm;
					var yyyy;


					function  createTable($node)
					{
						var $tr = $("<tr>");
						var weekdays = $thisWidget.options.lang.weekdaysShort;
						for(i in weekdays)
						{
							$tr.append($("<th>").text(weekdays[i]).addClass("weekday-td"));
						}
						var $buffer =   $("<table>").addClass("calendarnumbers");
						$buffer.append($tr);
						for(i = 0; i < 6 ; i++)
						{
							$tr = $("<tr>");
							$buffer.append($tr);
							for(j = 0; j < 7; j++)
							{
								$tr.append($("<td>").addClass("date-td"));
							}
						}
						$node.append($buffer);
						return $buffer;
					}

					invalidate = function()
					{

						$curentCalendar.find(".curentMonthText").text($thisWidget.options.lang.months[mm]);
						$curentCalendar.find(".curentYearText").text(yyyy);

						var calendarwr = $curentCalendar.find(".gridWrapper");
						var table = $curentCalendar.find(".calendarnumbers");

						var n = new Date(yyyy, mm + 1, 0).getDate();
						var currentday = dd;
						var weekday = new Date(yyyy, mm, 1).getDay();
						var prevdays = new Date(yyyy, mm, 0).getDate();
			 			if(weekday == 0)
			 				weekday = 7;
						var max = 42;
						var i = 1;
						var j = 0;
						var nextmdays = 1;
						$tableMain.find(".date-td").each(function(index, element)
						 	{
						 		$element = $(element);
						 		$element.unbind("click");
						 		if(index <= 7){
						 			if(index < weekday || weekday == 1){
										if(weekday == 1){
											$element.text(prevdays - weekday - 7 + index + 1).attr("class", "otherDays").bind("click",prevMonth);
										}else{
											$element.text(prevdays - weekday + index + 1).attr("class", "otherDays").bind("click",prevMonth);
										}
									}else{
										$element.text(i).bind("click",changeDay);
										if(i == currentday){
											$selectedCell = $element;
											$element.attr("class", "selectedCell");
										}
										else
											$element.attr("class", "curentMonth");
										i++;
									}
								}else{
									if(i <= n){
										$element.text(i).bind("click", changeDay).attr("class", "curentMonth");
									}else{
										$element.text(nextmdays).bind("click", nextMonth).attr("class", "otherDays");
										nextmdays++;
									}
									if(i == currentday){
										$selectedCell = $element;
										$element.attr("class", "selectedCell");
									}
									i++;
								}
							}

						 );
					}

					prev = function(day)
					{
						if(mm != 0){
							mm--;
						}else{
							if(yyyy-1 >= $thisWidget.options.MIN_YEAR){
								yyyy -= 1;
								mm = 11;
							}
							else
								return
						}
						if(day != undefined)
							dd = day;
						resetInput();
						invalidate();
					}

					next = function(day)
					{
						if(mm != 11){
							mm++;
						}else{
							if(yyyy + 1 < $thisWidget.options.MAX_YEAR){
								yyyy += 1;
								mm = 0;
							}else
								return
						}
						if(day != undefined)
							dd = day;
						resetInput();
						invalidate();
					}

					resetInput = function(){
						$calendarInput.val(changeDate());
					}

					changeDate = function()
					{
						var strdd;
						if(dd <= 9)
						 	strdd = "0" + dd.toString();
						 else
						 	strdd = dd.toString();
						var strmm;
						 if(mm <= 8)
						 	strmm = "0" + (mm + 1).toString();
						 else
						 	strmm = (mm + 1).toString();

						var stryyyy = yyyy.toString();
						return strdd + '-' + strmm + '-' + stryyyy;			
					}

					changeDay = function(event){
						var curent = $(event.currentTarget);
						dd  = $(event.currentTarget).text();
						$(curent).attr("class", "selectedCell");
						$selectedCell.attr("class", "curentMonth");
						$selectedCell = curent;
						resetInput();
					}

					function rewrite(){
						var lastday = new Date(yyyy, mm + 1, 0).getDate();
						dd = (lastday < dd)? lastday:dd;
						resetInput();
						invalidate();
					}

					nextyear  = function(event)
					{
						if(yyyy < $thisWidget.options.MAX_YEAR){
							yyyy++;
							rewrite();
						}
					}

					prevyear  = function(event)
					{
						if(yyyy >= $thisWidget.options.MIN_YEAR){
							yyyy--;
							rewrite();
						}
					}

					prevMonth = function(event)
					{
						var mday;
						if ($(event.currentTarget).attr("class") != "btnPrevMonthWrapper")
							mday  = $(event.currentTarget).text();
						prev(mday);
						rewrite();
					}

					nextMonth = function(event)
					{
						var day;
						if ($(event.currentTarget).attr("class") != "btnNextMonthWrapper")
							day  = $(event.currentTarget).text();
						next(day);
						rewrite();
					}
							
					var $curentCalendar = $this
					var $curmonth = $("<div>");
					var $nextmbtn = $("<div>");
					var $prevmbtn = $("<div>");
					var $calendarInput = $this.find(".dateinput");
					if( $calendarInput.get(0).validity.valid === false)
						return;
					var $gridWrapper = $("<div>").addClass("gridWrapper");
					var $calendarWrapper = $("<div>").attr("tabindex","-1");

					$curentCalendar.append($calendarWrapper.addClass("calendarWrapper"));
					$curmonth.addClass("curentMonthWrapper");
					$prevmbtn.addClass("btnPrevMonth").append($("<div>").addClass("btnPrevMonthWrapper").click(prevMonth));
					$nextmbtn.addClass("btnNextMonth").append($("<div>").addClass("btnNextMonthWrapper").click(nextMonth));
					var $nextYear = $("<div>").addClass("btnNextMonth").append($("<div>").addClass("btnNextMonthWrapper").click(nextyear));
					var $prevYear = $("<div>").addClass("btnPrevMonth").append($("<div>").addClass("btnPrevMonthWrapper").click(prevyear));
					$calendarWrapper.append($curmonth.append(
											$prevmbtn, 
											$("<div>").addClass("curentMonthText"), 
											$nextmbtn, 
											$prevYear,
											$("<div>").addClass("curentYearText"),
											$nextYear
											));

					$calendarWrapper.append($gridWrapper);
					
					// delete calendar on blur
					$calendarWrapper.blur(function()
					{ 	
						$calendarWrapper.remove(); 
					});

					$calendarWrapper.focus().trigger("focus");
					if($calendarInput.val() == ""){
						var today = new Date();
						dd = today.getDate();
						mm = today.getMonth();
						yyyy = today.getFullYear();
						$calendarInput.val(changeDate());
					}else{
						var str = $calendarInput.val().split('-');
						dd = parseInt(str[0]);
						mm = parseInt(str[1]) - 1;
						yyyy = parseInt(str[2]);
						console.log(dd, mm, yyyy);
						if(new Date(yyyy, mm + 1, 0).getDate() < dd || yyyy < $thisWidget.options.MIN_YEAR || yyyy > $thisWidget.options.MAX_YEAR ){
							alert($thisWidget.options.lang.dateError);
							return;
						}
					}
					$tableMain  = createTable($gridWrapper);
					invalidate();
				}
         }
    });
