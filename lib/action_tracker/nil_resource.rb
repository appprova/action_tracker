module ActionTracker
  # nodoc
  class NilResource
    def method_missing(_name, *_args)
      self
    end

    def respond_to_missing?(*_args)
      true
    end

    def to_s
      ''
    end

    def to_a
      []
    end

    def to_h
      {}
    end

    def to_str
      to_s
    end

    def to_ary
      to_a
    end

    def to_i
      0
    end

    def to_hash
      to_h
    end

    def present?
      true
    end
  end
end
