set :application, "touch-resume"
set :repository,  "http://github.com/samsonasu/touch-resume.git"
set :use_sudo, false
set :user, 'bsamson'
set :scm, :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

role :web, "briansamson.com"                          # Your HTTP server, Apache/etc
role :app, "briansamson.com"

set :deploy_to, "/u/apps/touch-resume"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
namespace :deploy do
   task :start do ; end
   task :stop do ; end
   task :restart do ; end
end
