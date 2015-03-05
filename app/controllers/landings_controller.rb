class LandingsController < ApplicationController
  def view
    @id_team = params[:id]
    @id_task = params[:event_id].to_i
    @flash_team = FlashTeam.find(params[:id])
    # Extract data from the JSON
    flash_team_status = JSON.parse(@flash_team.status)
    @flash_team_json = flash_team_status['flash_teams_json']
    @flash_team_event = @flash_team_json['events'][@id_task]
    @flash_team_name = @flash_team_json['title']
    #tm = params[:task_member].split(',') role of recipient 
    @task_member = params[:task_member]
    @email = params[:email]
    @start_date_time = Time.now
    @end_date_time = Time.now + 600
    @queuePosition = 0
    @wait_time = ""
    wait_time = 0
    @task_name = @flash_team_event['title']
    @project_overview = @flash_team_json['projectoverview']
    @task_description = @flash_team_event['notes']
    @inputs = @flash_team_event['inputs']
    #@input_link = params[:input_link]
    @outputs = @flash_team_event['outputs']
    #@output_description = params[:output_description]
    minutes = @flash_team_event['duration']
    hh, mm = minutes.divmod(60)
    @task_duration = hh.to_s 
    if hh==1
      @task_duration += " hour"
    else
      @task_duration += " hours"
    end
    if mm>0
      @task_duration += " and " + mm.to_s + " minutes"
    end

    @task_members = Array.new
    @flash_team_event['members'].each do |task_member|
      @task_members << getMemberById(@id_team, @id_task, task_member)
    end

    @invitationLink = ""
    @uniq = ""

    @task_members.each do |task_member|
      if task_member['role'] == @task_member
        @invitationLink = task_member['invitation_link']
        @uniq = task_member['uniq']
        break
      end
    end

    @relevantLanding1 = Array.new
    @relevantLanding1 = Landing.where(:id_team=>@id_team, :id_event=>@id_task, :task_member=>@task_member)

    for l in @relevantLanding1
      if m = Member.find_by_email(l.email) then
        if m.email_confirmed
          l.status = 'd'
          l.save
          return
        elsif Time.now>l.end_date_time
          l.destroy
          l.save
        end
      elsif Time.now>l.end_date_time
        l.destroy
        l.save
      end
    end

    @relevantLanding = Array.new
    @relevantLanding = Landing.where(:id_team=>@id_team, :id_event=>@id_task, :task_member=>@task_member)

    alreadyPresent = 0

    count = 0
    for l in @relevantLanding
      if l.email == @email then 
        alreadyPresent = 1 
        @newLanding = Landing.new
        @newLanding = l
        count = count+1
        break
      end
      count = count+1
    end

    if alreadyPresent == 0
      @queuePosition = @relevantLanding.length + 1
    else
      @queuePosition = count
    end

    if @queuePosition == 1
      @wait_time = 0
    else
      wait_time = @relevantLanding[@queuePosition-2].end_date_time-Time.now
      hh, mm = wait_time.divmod(60)
      @wait_time = hh.to_s 
      if hh==1
        @wait_time += " minute"
      else
        @wait_time += " minutes"
      end
      if mm>0
        @wait_time += " and " + mm.to_i.to_s + " seconds"
      end
    end

    if alreadyPresent == 0 
      @newLanding = Landing.new
      @newLanding.id_team = @id_team
      @newLanding.id_event = @id_task
      @newLanding.task_member = @task_member
      @newLanding.email = @email
      @newLanding.start_date_time = @start_date_time
      @newLanding.end_date_time = @end_date_time + wait_time
      @newLanding.queuePosition = @queuePosition
      @newLanding.status = 'p'
      @newLanding.save 
    else
      return
    end
  @relevantLanding = Landing.where(:id_team=>@id_team, :id_event=>@id_task, :task_member=>@task_member)
  end
end