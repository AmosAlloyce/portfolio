namespace :assets do
  desc "Copy React build files to public directory"
  task :copy_react_build do
    puts "Copying React build files from app/assets/builds to public..."
    FileUtils.mkdir_p(Rails.root.join('public'))
    FileUtils.cp_r(Dir.glob(Rails.root.join('app/assets/builds/*')), Rails.root.join('public/'))
    puts "React build files copied successfully!"
    puts "Contents of public directory:"
    system("ls -la #{Rails.root.join('public')}")
  end
end

# Hook into assets:precompile
Rake::Task['assets:precompile'].enhance do
  Rake::Task['assets:copy_react_build'].invoke
end
