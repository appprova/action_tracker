lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'action_tracker/version'

Gem::Specification.new do |spec|
  spec.name          = 'action_tracker'
  spec.version       = ActionTracker::VERSION
  spec.authors       = ['André Taiar', 'João Fraga']
  spec.email         = ['andre.taiar@appprova.com.br', 'joaogabriel@appprova.com.br']

  spec.summary       = 'Easy way to track actions in your application.'
  spec.description   = 'Easy way to track actions in your application without adding unnecessary code to your controllers.'
  spec.homepage      = 'http://coders.appprova.com.br/'
  spec.license       = 'MIT'

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_dependency 'activesupport', '~> 3.2'
  spec.add_dependency 'devise', '~> 3.4'

  spec.add_development_dependency 'bundler', '~> 1.11'
  spec.add_development_dependency 'rake', '~> 10.0'
  spec.add_development_dependency 'rspec-rails', '~> 3.0'
  spec.add_development_dependency 'rails', '~> 3.2'
  spec.add_development_dependency 'guard', '~> 2.13'
  spec.add_development_dependency 'byebug', '~> 5.0'
  spec.add_development_dependency 'guard-rspec', '~> 4.6'
end
